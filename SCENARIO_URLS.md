# Scenario URLs for ADO Handoff

This document lists all available UI scenarios with their corresponding URLs for easy linking in Azure DevOps work items.

## Available Scenarios

### 1. Default Scenario
**Description**: Normal flow with all features available (no existing students)
**URL**: `https://your-domain.com/`
**Use Case**: Standard user flow testing

### 2. With Existing Students Scenario
**Description**: Students from other services are available to add
**URL**: `https://your-domain.com/?scenario=with-existing-students`
**Use Case**: Testing the flow where users can add existing students from other BH services

### 3. No Appointments Scenario
**Description**: All students have 0/3 sessions available
**URL**: `https://your-domain.com/?scenario=no-appointments`
**Use Case**: Testing UI when students have no available sessions

### 4. No Topics Available Scenario
**Description**: No topics available for selected student
**URL**: `https://your-domain.com/?scenario=no-topics-available`
**Use Case**: Testing UI when no topics are available for a student's age/grade

### 5. No Dates Available Scenario
**Description**: No dates/times available for selected topic
**URL**: `https://your-domain.com/?scenario=no-dates-available`
**Use Case**: Testing UI when no dates and times are available for a selected topic

## How to Use

1. **Copy URLs**: Use the copy button in the scenario switcher (top-right corner)
2. **Paste in ADO**: Add these URLs to your Azure DevOps work items
3. **Direct Access**: Users can navigate directly to any scenario using these URLs
4. **Browser Navigation**: Back/forward buttons work with scenario changes

## Technical Details

- **URL Parameters**: Scenarios are controlled via the `scenario` query parameter
- **Default Behavior**: No parameter = default scenario
- **Browser Sync**: URL updates automatically when switching scenarios
- **No Page Reload**: Scenario changes happen instantly without page refresh

## Example ADO Usage

```
Title: Test No Appointments Scenario
Description: Verify UI behavior when students have no available sessions
URL: https://your-domain.com/?scenario=no-appointments
Acceptance Criteria:
- Students show 0/3 sessions
- Appropriate messaging is displayed
- UI remains functional
``` 