#!/bin/bash

# Trim inputs
WebhookUrl=$(echo $WebhookUrl | sed 's/ *$//g' | sed 's/^ *//g')
Title=$(echo $Title | sed 's/ *$//g' | sed 's/^ *//g')
Text=$(echo $Text | sed 's/ *$//g' | sed 's/^ *//g')

if [[ -z "$Text" ]]; then
    echo 'Text is missing'
    exit 1
fi

if [[ -z "$ButtonLabel" ]]; then
    ButtonLabel='Visit link'
fi

if [[ -z "$ThemeColor" ]]; then
    ThemeColor='0076D7'
fi

PAYLOAD="{\"@type\": \"MessageCard\",
                \"@context\": \"https://schema.org/extensions\",
                \"themeColor\": \"$ThemeColor\",
                \"summary\": \"$Title\",
                \"sections\": [
                {
                  \"activityTitle\": \"$Title\",
                  \"activitySubtitle\": \"Run: $WorkflowName - $WorkflowRunNumber\",
                  \"text\": \"$Text\"
                }
                ],
                \"potentialAction\": [
                  {
                    \"@type\": \"OpenUri\",
                    \"name\": \"$ButtonLabel\",
                    \"targets\": [
                      { \"os\": \"default\", \"uri\": \"$ActionLink\" }
                    ]
                  }
                ]
                }"

response=$(curl -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$WebhookUrl")

if [[ $response != 1 ]]; then
    echo $response
    exit 1
fi
