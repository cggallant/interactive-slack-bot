const { App } = require('@slack/bolt');
const { messageToPost } = require('./deskbooking.js');
const schedule = require('node-schedule');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Only respond if the app is mentioned (needs bot event: app_mention and Scope: app_mentions:read)
app.event('app_mention', async({ event, context, client, say }) => {
  // By default, if it's just a mention, create a desk booking floorplan
  // for tomorrow. There may be times, however, where we may notice an issue 
  // with a floorplan and want to correct it. We can do a mention and include 
  // the text 'today' that lets this know that it should use today's date 
  // instead.
  //
  // If 'today' wasn't specified then we're to display tomorrow's date
  const message = event.text.toLowerCase();
  const forTomorrow = (message.indexOf("today") === -1);

  // In my production app, I also check the message for "channel 2" and/or "layout 2" which allows me to control
  // where the message is displayed (main channel or my private test channel) and which layout to use (main 
  // layout or one I use for testing things so that I don't risk breaking the main layout). 
  //
  //  Similar to the forTomorrow variable, I have a couple of variables that default to the main channel and 
  //  layout but get changed if the messages are included.
  // 
    
  // Have the floorplan posted
  await postFloorplan(forTomorrow);
});


async function postFloorplan(forTomorrow) {
  // If the floorplan is for tomorrow then add a day to the current date
  const displayDate = new Date();    
  if (forTomorrow) { displayDate.setDate(displayDate.getDate() + 1); }

  // Adjust the first block's text to indicate the date in a long date format.
  const formatOptions = { "weekday": "long", "year": "numeric", "month": "long", "day": "numeric"};
  messageToPost.blocks[0].text.text = `*Desk booking for ${displayDate.toLocaleDateString("en-US", formatOptions)}...*`;

  // Send the desk booking message
  await app.client.chat.postMessage({ channel: process.env.POST_TO_CHANNEL,
      blocks: messageToPost.blocks, 
      text: "Desk reservation system." });
}

// Listen for a button click (regex to listen for any button starting with the word 'Reserve')
app.action(/Reserve/, async ({ body, action, ack, respond }) => {
  // Acknowledge the request right away
  await ack();
  
  const buttonIdClicked = action.action_id;
  let buttonText = "";

  // Grab the UserID of the user who clicked on the button and the value from
  // the button. If the desk is already reserved, only continue if the button
  // was clicked by the person who reserved it.
  const userIdWhoActioned = body.user.id;
  const valueJSON = JSON.parse(action.value);
  const reserve = (valueJSON.userId === ""); // If we're to reserve or unreserve
  if (reserve) {
      valueJSON.userId = userIdWhoActioned;
      
      // Request the user's profile information (the body.user.name holds 
      // something like 'ggallant' or 'gerard' but I want to display the full
      // name).        
      const userInfo = await app.client.users.info({"user": userIdWhoActioned});
      buttonText = `:white_check_mark: Reserved by ${userInfo.user.real_name}`;
  }
  else { // Unreserving a desk...
      // If the user who clicked on the button is not the one that reserved
      // the desk then exit now...
      if (valueJSON.userId !== userIdWhoActioned) {
          console.log("logged in user is not the one who reserved the desk!");   
          return;
      } // End if (valueJSON.userId !== userIdWhoActioned)

      valueJSON.userId = "";
      buttonText = "Available";
  } // End if (reserve)


  let curBlock = null;
  let curBlockAccessory = null;
  
  // Grab the list of blocks for the current message and loop through them to 
  // find the one that was just clicked on.
  const messageBlocks = body.message.blocks;
  const count = messageBlocks.length;
  for (let i = 0; i < count; i++) {
      // Grab the current block
      curBlock = messageBlocks[i];

      // If we're dealing with an image then...
      if (curBlock.type === "image") {
//console.log(JSON.stringify(curBlock));
          // Remove some properties that were added by Slack (they'll throw
          // an error if they're included with the payload)
          delete curBlock.fallback;
          delete curBlock.image_width;
          delete curBlock.image_height;
          delete curBlock.image_bytes;
          delete curBlock.rotation;
          delete curBlock.is_animated;

          // Skip to the next block in the list
          continue;
      } // End if (curBlock.type === "image")

      // Skip this block if it's not one that has a Reservation button...
      if ((curBlock.type !== "section") || 
          (typeof curBlock.accessory === "undefined") ||
          (curBlock.accessory.type !== "button")) { 
              continue; 
      }

      // Grab the block's accessory section. If this block contains the button
      // that was clicked on then...
      curBlockAccessory = curBlock.accessory;
      if (curBlockAccessory.action_id === buttonIdClicked) {
          curBlockAccessory.text.text = buttonText;
          curBlockAccessory.value = JSON.stringify(valueJSON);
          
          // The style property can't be there if we want the default border.
          // The only styles that can be set are 'primary' (green) and 
          // 'danger' (red).
          //
          // Give the button a green border when the desk is reserved.
          if (reserve) { curBlockAccessory.style = "primary"; }
          // Remove the style so that we get the default border when the desk
          // is available.
          else { delete curBlockAccessory.style; }

          // NOTE: Do *not* break out of the loop. We need to keep looping
          //       to make sure all image blocks are formatted correctly.
      } // End if (curBlock.accessory.action_id === buttonIdClicked)
  } // End of the for (let i = 0; i < count; i++) loop.

  await respond({ blocks: messageBlocks }, { replace_original: true });
});

// My machine and the server are on two different time zones. I tried using UTC
// time but, because of daylight savings changes, the time the mesages are 
// posted in Atlantic Time changes (instead of 5pm, the messages are now at
// 4pm). I ended up using a Time zone here instead (the list of time zones can
// be found here:
// https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
//
// I'm also adjusting it to only run Sunday-Thursday, because it's posting for
// the next day, rather than every day (some people come in on the weekend but
// there's less likely to be a desk shortage then. If they do need a specific
// desk, they can always call up the app using "@<botname> today")
const job = schedule.scheduleJob({hour: 18, minute: 0, tz: 'America/Glace_Bay',
    dayOfWeek: [0,1,2,3,4]}, async () => {
      await postFloorplan(true);
});

(async () => {
  await app.start(process.env.PORT || 3010);

  console.log('?????? Bolt app is running!');
})();