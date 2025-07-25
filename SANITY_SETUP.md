# Sanity CMS Setup for Coaching Form Topics

This guide will help you set up Sanity CMS to manage the coaching form topics, allowing your PM to easily manipulate topics, categories, and age groups.

## Prerequisites

1. A Sanity account (sign up at [sanity.io](https://sanity.io))
2. Node.js and pnpm installed
3. Access to the coaching-form project

## Setup Steps

### 1. Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create new project"
3. Choose "Clean project with no predefined schemas"
4. Name your project (e.g., "Coaching Form CMS")
5. Note down your **Project ID** (you'll need this later)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_TOKEN=your-write-token-here
```

To get your write token:
1. Go to your Sanity project dashboard
2. Navigate to API → Tokens
3. Create a new token with "Editor" permissions
4. Copy the token to your `.env.local` file

### 3. Update Sanity Configuration

Edit `sanity.config.ts` and replace `'your-project-id'` with your actual project ID:

```typescript
export default defineConfig({
  name: 'default',
  title: 'Coaching Form CMS',
  projectId: 'your-actual-project-id', // Replace this
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### 4. Run the Development Server

```bash
pnpm dev
```

### 5. Access Sanity Studio

Navigate to `http://localhost:3000/studio` to access the Sanity Studio interface.

### 6. Migrate Existing Data

Run the migration script to populate Sanity with your existing topic data:

```bash
node scripts/migrateToSanity.js
```

**Note:** Make sure your environment variables are set before running the migration.

## Schema Overview

### Categories
- **Title**: The category name (e.g., "Education Planning")
- **Description**: Brief description of the category
- **Section Description**: Detailed description shown in the topic selector
- **Icon**: Icon name for display
- **Order**: Display order
- **Active**: Whether the category is available

### Topics
- **Title**: The topic name (e.g., "Navigating Middle School")
- **Supporting Text**: Brief description shown under the topic
- **Detailed Description**: Full description of the topic
- **Featured**: Whether to highlight as "Most Popular"
- **Order**: Display order within category
- **Active**: Whether the topic is available
- **Tags**: Array of tags for categorization

### Age Groups
- **Title**: Age group name (e.g., "4th grade")
- **Description**: Brief description
- **Min/Max Age**: Age range in years
- **Order**: Display order
- **Active**: Whether the age group is available

### Topic-Category-Age Relationships
- **Topic**: Reference to a topic
- **Category**: Reference to a category
- **Age Groups**: Array of age group references
- **Active**: Whether this relationship is available
- **Order**: Display order
- **Notes**: Internal notes

## How Your PM Can Use This

### Adding New Topics
1. Go to `/studio` in your browser
2. Click "Topic" in the left sidebar
3. Click "Create new"
4. Fill in the topic details
5. Save the topic
6. Create a "Topic-Category-Age Relationship" to connect it to categories and age groups

### Modifying Existing Topics
1. Find the topic in the Topic list
2. Click to edit
3. Modify any fields
4. Save changes

### Managing Featured Topics
1. Edit a topic
2. Toggle the "Featured Topic" checkbox
3. Add supporting text to make it appear as "Most Popular"

### Adding New Categories
1. Go to "Category" in the sidebar
2. Create a new category
3. Set the display order
4. Add appropriate descriptions

### Managing Age Groups
1. Go to "Age Group" in the sidebar
2. Create or edit age groups
3. Set age ranges and display order

## Integration with Your App

The `lib/sanityClient.ts` file contains helper functions to fetch data from Sanity. You can use these functions to replace the current hardcoded data in `lib/topicLogicData.js`.

### Example Usage

```typescript
import { getCategories, getTopicsForCategoryAndAge } from '@/lib/sanityClient'

// Get all categories
const categories = await getCategories()

// Get topics for a specific category and age
const topics = await getTopicsForCategoryAndAge('education-planning', '4th grade')
```

## Benefits for Your PM

1. **Visual Interface**: No need to edit code files
2. **Real-time Updates**: Changes appear immediately in the app
3. **Rich Content**: Support for detailed descriptions and metadata
4. **Version Control**: Sanity tracks all changes
5. **Collaboration**: Multiple team members can work simultaneously
6. **Validation**: Built-in validation prevents data errors
7. **Media Support**: Can add images and other media to topics

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors**: Make sure all dependencies are installed with `pnpm install`
2. **Studio not loading**: Check that your project ID is correct in `sanity.config.ts`
3. **Migration fails**: Verify your `SANITY_TOKEN` has write permissions
4. **Environment variables not working**: Restart your development server after adding `.env.local`

### Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-sanity)
- [Sanity Community](https://www.sanity.io/community)

## Next Steps

1. Set up your Sanity project
2. Run the migration script
3. Test the studio interface
4. Train your PM on using the interface
5. Gradually migrate your app to use Sanity data instead of hardcoded data 