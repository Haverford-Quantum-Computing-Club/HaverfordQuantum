# Announcements System Documentation

## Overview
The announcement banner system allows you to display important updates and notifications to all website visitors. Announcements appear at the top of every page and can be dismissed by users.

## How to Add/Update Announcements

### 1. Edit the JSON File
Open `announcements-data.json` and add or modify announcements:

```json
{
  "id": "unique-announcement-id",
  "message": "🎉 Your announcement message here",
  "type": "info",
  "link": {
    "text": "Button Text",
    "url": "page.html"
  },
  "startDate": "2025-01-14",
  "endDate": "2025-01-16",
  "dismissible": true,
  "active": true
}
```

### 2. Field Descriptions

- **id** (required): Unique identifier for the announcement (e.g., "event-reminder-3days")
- **message** (required): The announcement text (emojis supported!)
- **type** (required): Visual style of the banner
  - `"info"` - Blue banner for general information
  - `"warning"` - Orange banner for important updates
  - `"success"` - Green banner for positive news
  - `"urgent"` - Red banner with pulse animation for critical alerts
- **link** (optional): Add a call-to-action button
  - `text`: Button label
  - `url`: Destination URL (relative or absolute)
- **startDate** (required): When to start showing (format: YYYY-MM-DD)
- **endDate** (required): When to stop showing (format: YYYY-MM-DD)
- **dismissible** (required): Can users close the banner?
  - `true`: Shows close (X) button
  - `false`: Always visible (use sparingly!)
- **active** (required): Master on/off switch
  - `true`: Show this announcement (if dates match)
  - `false`: Hide this announcement

### 3. Example Announcements

#### Event Reminder
```json
{
  "id": "event-starting-soon",
  "message": "⏰ Event starts in 2 hours! Make sure you're checked in.",
  "type": "warning",
  "link": {
    "text": "View Schedule",
    "url": "schedule.html"
  },
  "startDate": "2025-11-14",
  "endDate": "2025-11-14",
  "dismissible": false,
  "active": true
}
```

#### New Resources Available
```json
{
  "id": "day2-notebooks-ready",
  "message": "📓 Day 2 notebooks are now available for download!",
  "type": "success",
  "link": {
    "text": "Download Now",
    "url": "resources.html"
  },
  "startDate": "2025-11-15",
  "endDate": "2025-11-15",
  "dismissible": true,
  "active": true
}
```

#### Schedule Change
```json
{
  "id": "room-change-workshop",
  "message": "⚠️ IMPORTANT: Quantum ML Workshop moved to Room 201",
  "type": "urgent",
  "link": {
    "text": "Updated Schedule",
    "url": "schedule.html"
  },
  "startDate": "2025-11-15",
  "endDate": "2025-11-15",
  "dismissible": false,
  "active": true
}
```

## Quick Management Tips

### To Show an Announcement
1. Edit `announcements-data.json`
2. Set `"active": true`
3. Set appropriate start/end dates
4. Commit and push to GitHub

### To Hide an Announcement
1. Edit `announcements-data.json`
2. Set `"active": false`
3. Commit and push to GitHub

### To Update an Announcement
1. Find the announcement by its `id`
2. Modify the `message`, `type`, or `link`
3. Commit and push to GitHub

## User Experience

- **First Visit**: Users see all active announcements
- **Dismissing**: Click the X button (if dismissible)
- **Remembering**: Browser remembers dismissed announcements using localStorage
- **Multiple Announcements**: Stack vertically, newest on top
- **Mobile Friendly**: Automatically adjusts layout for small screens

## Testing

To test announcements locally:

1. Open browser developer console
2. Clear dismissed announcements:
   ```javascript
   announcementsDebug.clearDismissed()
   ```
3. Refresh page to see all announcements again

## Troubleshooting

**Announcement not showing?**
- Check `"active": true`
- Verify today's date is between startDate and endDate
- Clear dismissed announcements (see Testing section)
- Check browser console for errors

**Want to force-show during event?**
- Set `"dismissible": false` for critical announcements
- Users won't be able to close them

## Best Practices

1. ✅ Use emojis to make announcements eye-catching
2. ✅ Keep messages concise (under 100 characters)
3. ✅ Use appropriate types (info/warning/success/urgent)
4. ✅ Add action links when possible
5. ✅ Set realistic date ranges
6. ✅ Make most announcements dismissible
7. ❌ Don't show too many announcements at once (max 2-3)
8. ❌ Don't use "urgent" type unless truly critical
9. ❌ Don't make everything non-dismissible

## Examples for Your Event

**Before Event (Nov 1-13)**
- Registration reminders
- Discord join prompts
- Prerequisites information

**Day Before (Nov 13)**
- Final reminders
- Check-in information
- What to bring

**Event Days (Nov 14-15)**
- Live schedule updates
- Room changes
- Current session info
- Resources available

**After Event (Nov 16+)**
- Thank you message
- Certificates available
- Photos/highlights
- Next event teaser
