https://dartans.github.io/Canal-City-BBQ/

# Canal City BBQ Website

A modern, responsive one-page website for Canal City BBQ catering business with a dynamic content management system.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Content Management**: All content is stored in `config.json` and loaded dynamically
- **Smooth Navigation**: One-page navigation with smooth scrolling
- **Mobile-Friendly Menu**: Hamburger menu for mobile devices
- **Google Calendar Integration**: Embedded booking calendar
- **Easy Content Updates**: No code changes needed to update content

## File Structure

```
├── index.html          # Main website HTML (mostly structure, content loaded dynamically)
├── styles.css          # All styling and responsive design
├── content-manager.js  # JavaScript for loading and managing content
├── config.json         # All website content and configuration
├── admin.html          # Simple admin interface for content editing
└── README.md          # This file
```

## Content Management

All website content is stored in `config.json` and includes:

### Business Information
- Business name, phone, email
- Service area and hours
- Tagline and description

### Page Content
- Hero section (title, subtitle, description, CTA)
- About section (story, features)
- Menu items and pricing
- Service offerings
- Booking information
- Navigation items

### How to Update Content

#### Method 1: Edit config.json directly
1. Open `config.json` in any text editor
2. Make your changes (be careful with JSON syntax)
3. Save the file
4. Refresh the website

#### Method 2: Use the Admin Interface
1. Open `admin.html` in your browser
2. Click "Load Current Content"
3. Edit the fields as needed
4. Click "Save Changes" to see the JSON output
5. Copy the JSON and save it to `config.json`

### Example Content Updates

**Change Phone Number:**
```json
{
  "business": {
    "phone": "(555) 123-NEW1"
  }
}
```

**Add New Menu Item:**
```json
{
  "menu": {
    "categories": [
      {
        "name": "Smoked Meats",
        "items": [
          {
            "name": "Smoked Turkey",
            "description": "Herb-rubbed turkey breast smoked to perfection",
            "price": "$15/lb"
          }
        ]
      }
    ]
  }
}
```

**Update Hero Section:**
```json
{
  "hero": {
    "title": "New Business Name",
    "subtitle": "New Tagline",
    "description": "New description..."
  }
}
```

## Technical Details

### JavaScript Content Loading
The `content-manager.js` script:
- Fetches content from `config.json`
- Populates all page elements dynamically
- Handles navigation setup
- Manages responsive behavior

### Key Functions
- `ContentManager.loadConfig()`: Loads JSON configuration
- `ContentManager.populatePage()`: Updates all page content
- `ContentManager.updateConfig()`: Updates configuration dynamically

### CSS Structure
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth animations and transitions
- Custom scrollbar styling
- Print-friendly styles

## Setup Instructions

1. **Basic Setup:**
   - No build process required
   - Simply serve the files from a web server
   - All files must be served from the same domain (due to JSON loading)

2. **Local Development:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Production Deployment:**
   - Upload all files to your web server
   - Ensure `config.json` is accessible
   - Update Google Calendar embed URL in `config.json`

## Google Calendar Integration

To set up booking calendar:

1. Create a Google Calendar for bookings
2. Get the embed code from Google Calendar settings
3. Update the `embedUrl` in `config.json`:
   ```json
   {
     "booking": {
       "calendar": {
         "embedUrl": "your-google-calendar-embed-url-here"
       }
     }
   }
   ```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes

- The admin interface is for demonstration only
- In production, implement proper authentication
- Consider server-side content management
- Validate JSON before saving

## Customization

### Adding New Sections
1. Add content structure to `config.json`
2. Add HTML placeholder in `index.html`
3. Add population logic in `content-manager.js`
4. Style the new section in `styles.css`

### Changing Colors/Styling
- Edit `styles.css`
- Main brand colors: `#8b4513` (brown), `#ff6347` (red-orange), `#ffd700` (gold)

### Adding New Content Types
1. Extend the JSON structure in `config.json`
2. Add corresponding population logic in `content-manager.js`
3. Update the admin interface if needed

## Future Enhancements

- Database integration for content management
- Image upload and management
- Online ordering system integration
- Customer review system
- Blog/news section
- Multi-language support
- Advanced booking system with availability checking