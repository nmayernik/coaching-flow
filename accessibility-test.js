// Accessibility Test Script
// Run this in your browser console at http://localhost:3000

console.log('🔍 Running Accessibility Tests...');

// Test 1: Check for ARIA attributes on the progressive disclosure button
function testProgressiveDisclosure() {
  const showMoreButton = document.querySelector('button[aria-expanded]');
  if (showMoreButton) {
    console.log('✅ Progressive disclosure button found with aria-expanded');
    console.log('   aria-expanded:', showMoreButton.getAttribute('aria-expanded'));
    console.log('   aria-controls:', showMoreButton.getAttribute('aria-controls'));
    console.log('   Button text:', showMoreButton.textContent.trim());
  } else {
    console.log('❌ Progressive disclosure button not found');
  }
}

// Test 2: Check for proper heading structure
function testHeadings() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  console.log('📋 Found', headings.length, 'headings:');
  headings.forEach((heading, index) => {
    console.log(`   ${index + 1}. ${heading.tagName} - "${heading.textContent.trim()}"`);
  });
}

// Test 3: Check for form labels
function testFormLabels() {
  const inputs = document.querySelectorAll('input, textarea, select');
  console.log('📝 Found', inputs.length, 'form inputs:');
  inputs.forEach((input, index) => {
    const hasLabel = input.labels && input.labels.length > 0;
    const hasAriaLabel = input.hasAttribute('aria-label');
    const hasPlaceholder = input.hasAttribute('placeholder');
    console.log(`   ${index + 1}. ${input.type || input.tagName} - Label: ${hasLabel ? '✅' : '❌'}, Aria-label: ${hasAriaLabel ? '✅' : '❌'}, Placeholder: ${hasPlaceholder ? '✅' : '❌'}`);
  });
}

// Test 4: Check for keyboard navigation
function testKeyboardNavigation() {
  const focusableElements = document.querySelectorAll('button, input, textarea, select, a, [tabindex]');
  console.log('⌨️  Found', focusableElements.length, 'focusable elements');
  
  // Test tab order
  console.log('   Tab order test: Press Tab to cycle through elements');
  focusableElements.forEach((el, index) => {
    el.addEventListener('focus', () => {
      console.log(`   Focused element ${index + 1}:`, el.tagName, el.textContent?.trim() || el.placeholder || el.type);
    });
  });
}

// Test 5: Check color contrast (basic)
function testColorContrast() {
  const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
  console.log('🎨 Color contrast test:');
  console.log('   Note: For detailed contrast analysis, use Chrome DevTools → Lighthouse');
  
  // Check for sufficient text size
  const smallTexts = Array.from(textElements).filter(el => {
    const style = window.getComputedStyle(el);
    const fontSize = parseInt(style.fontSize);
    return fontSize < 12; // Less than 12px might be too small
  });
  
  if (smallTexts.length > 0) {
    console.log('   ⚠️  Found', smallTexts.length, 'elements with potentially small text');
  } else {
    console.log('   ✅ Text sizes appear adequate');
  }
}

// Run all tests
console.log('\n🚀 Starting Accessibility Tests...\n');
testProgressiveDisclosure();
console.log('');
testHeadings();
console.log('');
testFormLabels();
console.log('');
testKeyboardNavigation();
console.log('');
testColorContrast();

console.log('\n📊 Test Summary:');
console.log('   - Run Chrome DevTools → Lighthouse for detailed accessibility audit');
console.log('   - Use VoiceOver (Cmd + F5) to test screen reader functionality');
console.log('   - Test keyboard navigation with Tab key');
console.log('   - Check color contrast with browser dev tools'); 