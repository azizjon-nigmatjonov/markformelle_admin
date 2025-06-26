# Infinite Scroll Implementation in LiteOptionsTable

## Overview

The `LiteOptionsTable` component now includes infinite scroll functionality that automatically loads more data when the user scrolls to the bottom of the table. This feature improves user experience by eliminating the need for pagination controls and providing a seamless browsing experience.

## How It Works

### Initial Load
- The component starts with a default limit of **50 items** per page
- When the dropdown is opened, it fetches the first 50 items from the API

### Infinite Scroll Behavior
- When the user scrolls to within **10 pixels** of the bottom of the table
- The `perPage` limit is automatically increased by **50 items**
- This triggers a new API request to fetch additional data
- The new data is appended to the existing list

### Scroll Detection
- Uses a scroll event listener on the table container
- Calculates scroll position: `scrollTop + clientHeight >= scrollHeight - 10`
- Only triggers when not currently loading data to prevent multiple requests

## Implementation Details

### TableUI Component Changes
```typescript
// Added scroll detection
const handleScroll = useCallback(() => {
  if (!tableRef.current || !onLoadMore || isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
  const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;

  if (isNearBottom) {
    onLoadMore();
  }
}, [onLoadMore, isLoading]);
```

### LiteOptionsTable Component Changes
```typescript
// Infinite scroll handler
const handleLoadMore = useCallback(() => {
  if (isLoading) return;
  
  setFilterParams((prev) => ({
    ...prev,
    perPage: (prev.perPage || 50) + 50,
  }));
}, [setFilterParams, isLoading]);
```

### API Integration
- Uses the existing `useFetchType` hook
- Default `perPage` changed from 100 to 50
- API endpoint: `${API_URL}/${link}/?skip=${page-1}&limit=${perPage}`
- Automatically handles the `skip` parameter based on current page

## Usage

The infinite scroll feature is automatically enabled for all `LiteOptionsTable` components. No additional configuration is required.

### Example Usage
```typescript
<LiteOptionsTable
  name="HAMID"
  link="ham"
  headColumns={[
    { id: "HAMID", title: "HAMID", width: 75 },
    { id: "ADI", title: "ADI", width: 160 },
    { id: "HAMTIPIADI", title: "HAMTIPIADI", width: 130 },
  ]}
  handleSelect={(obj) => setValue("HAMID", obj.HAMID)}
  control={control}
/>
```

## Features

### Loading States
- Shows a loading spinner when initially loading data
- Shows a smaller loading indicator at the bottom when loading more data
- Prevents multiple simultaneous requests

### Reset Behavior
- When searching, the limit resets to 50 items
- When opening the dropdown, the limit resets to 50 items
- Ensures consistent behavior across different interactions

### Performance Optimizations
- Uses `useCallback` for scroll handler to prevent unnecessary re-renders
- Debounced search functionality (300ms delay)
- Efficient scroll event handling with proper cleanup

## Browser Compatibility

- Works in all modern browsers that support scroll events
- Uses standard DOM APIs for scroll detection
- No external dependencies required

## API Requirements

The backend API should support:
- `skip` parameter for pagination offset
- `limit` parameter for number of items per request
- Consistent data structure across requests
- Proper handling of the `q` parameter for search queries 