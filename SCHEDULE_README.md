# Schedule Editing Guide

## How to Update the Schedule

Your schedule data is embedded directly in the `schedule.js` file for reliable loading. To update the schedule, edit the `SCHEDULE_DATA` constant at the top of `schedule.js`.

## File Location
```
HaverfordQuantum/schedule.js
```

## How to Edit

1. Open `schedule.js` in any text editor
2. Find the `SCHEDULE_DATA` constant at the top (starts around line 2)
3. Edit the events, times, locations, or descriptions within the data structure
4. Save the file
5. Commit and push to GitHub
6. Your changes will appear on the website automatically!

## JSON Structure

The schedule is organized by days. Each day has:
- `date`: The full date (e.g., "Friday, November 14th, 2025")
- `day`: A short label (e.g., "Day 1 - Friday")
- `events`: An array of events for that day

### Event Structure

Each event has:
- `time`: The time range (e.g., "5:00 PM - 7:00 PM")
- `title`: Event name
- `location`: Where it's happening (use "TBA" if unknown)
- `description`: Brief description of the event
- `type`: Event category (see types below)

### Event Types

Choose from these types (affects color coding):
- `logistics` - Check-in/registration events (purple)
- `ceremony` - Opening/closing ceremonies (orange)
- `workshop` - Educational workshops (purple)
- `hands-on` - Hands-on activities (gray)
- `networking` - Networking sessions (gray)
- `talk` - Keynote speakers (pink)
- `break` - Meals and breaks (green)
- `challenge` - Competition/challenges (blue)
- `presentation` - Team presentations (gray)

## Example Event

```json
{
  "time": "5:00 PM - 7:00 PM",
  "title": "Kick-Off & Tutorials",
  "location": "KINSC L108",
  "description": "Welcome session with quantum computing tutorials and team formation",
  "type": "ceremony"
}
```

## Tips

- Keep times consistent (use AM/PM format)
- Use "TBA" for locations you haven't finalized yet
- Keep descriptions concise (1-2 sentences)
- Make sure to maintain the JSON syntax (commas, quotes, brackets)
- Test your JSON validity at https://jsonlint.com/ if needed

## Adding More Days

To add a third day, simply add another object to the array:

```json
[
  { ... day 1 ... },
  { ... day 2 ... },
  {
    "date": "Sunday, November 16th, 2025",
    "day": "Day 3 - Sunday",
    "events": [
      ...
    ]
  }
]
```

## Need Help?

- JSON validation: https://jsonlint.com/
- If the schedule doesn't appear, check the browser console for errors
- Make sure the JSON file is valid (no missing commas or brackets)
