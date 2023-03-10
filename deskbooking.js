module.exports.messageToPost = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Desk booking for [date]...*"
			}
		},
		{
			"type": "image",
			"title": {
				"type": "plain_text",
				"text": "Main Floor",
				"emoji": true
			},
			"image_url": "https://github.com/cggallant/interactive-slack-bot/blob/main/code/img/floor-plan.jpg?raw=true",
			"alt_text": "Main Floor"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 1"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk1",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 2"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk2",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 3"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk3",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 4"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk4",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 5"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk5",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 6"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk6",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 7"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk7",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 8"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available",
					"emoji": true
				},
				"action_id": "ReserveDesk8",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 9"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk9",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 10"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk10",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 11"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk11",
				"value": "{\"userId\":\"\"}"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Desk 12"
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Available"
				},
				"action_id": "ReserveDesk12",
				"value": "{\"userId\":\"\"}"
			}
		}
	]
};