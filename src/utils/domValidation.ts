import React from 'react';

// DOM validation utility to prevent whitespace text node errors
export const cleanJSXWhitespace = (jsx: any): any => {
  if (Array.isArray(jsx)) {
    return jsx
      .filter((item) => {
        // Remove whitespace-only text nodes
        if (typeof item === 'string') {
          return item.trim().length > 0;
        }
        return true;
      })
      .map(cleanJSXWhitespace);
  }
  
  if (typeof jsx === 'object' && jsx !== null) {
    if (jsx.props && jsx.props.children) {
      const cleanedChildren = cleanJSXWhitespace(jsx.props.children);
      return {
        ...jsx,
        props: {
          ...jsx.props,
          children: cleanedChildren
        }
      };
    }
  }
  
  return jsx;
};

// Helper to ensure no whitespace between table elements
export const TableJSX = {
  // Use this instead of empty strings in table contexts
  Empty: null,
  
  // Use this for conditional rendering in tables
  Conditional: (condition: boolean, children: any) => 
    condition ? children : null,
  
  // Use this for mapping with proper keys
  Map: <T,>(
    items: T[],
    render: (item: T, index: number) => React.ReactElement,
    keyExtractor?: (item: T, index: number) => string | number
  ): React.ReactElement[] => {
    return items.map((item, index) => {
      const key = keyExtractor ? keyExtractor(item, index) : index;
      return React.createElement(React.Fragment, { key }, render(item, index));
    });
  }
};

// ESLint rule suggestion for preventing this error
export const eslintRules = {
  'react/no-unescaped-entities': 'error',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }]
}; 