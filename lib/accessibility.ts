import axe from 'axe-core'

/**
 * Run accessibility audit on a specific element or the entire document
 * @param element - DOM element to audit (defaults to document)
 * @param options - Axe configuration options
 */
export async function runAccessibilityAudit(
  element: Element | Document = document,
  options: axe.RunOptions = {}
): Promise<axe.AxeResults> {
  try {
    const results = await axe.run(element, options)
    
    if (results.violations.length > 0) {
      console.group('🚨 Accessibility Violations Found')
      results.violations.forEach((violation) => {
        console.group(`${violation.impact?.toUpperCase()}: ${violation.description}`)
        console.log('Rule ID:', violation.id)
        console.log('Help:', violation.help)
        console.log('Help URL:', violation.helpUrl)
        console.log('Affected elements:', violation.nodes.length)
        violation.nodes.forEach((node, index) => {
          console.log(`Element ${index + 1}:`, node.target, node.html)
        })
        console.groupEnd()
      })
      console.groupEnd()
    } else {
      console.log('✅ No accessibility violations found!')
    }
    
    return results
  } catch (error) {
    console.error('Error running accessibility audit:', error)
    throw error
  }
}

/**
 * Run accessibility audit and return only violations
 */
export async function getAccessibilityViolations(
  element: Element | Document = document,
  options: axe.RunOptions = {}
): Promise<axe.Result[]> {
  const results = await runAccessibilityAudit(element, options)
  return results.violations
}

/**
 * Check if an element passes accessibility tests
 */
export async function isAccessible(
  element: Element | Document = document,
  options: axe.RunOptions = {}
): Promise<boolean> {
  const violations = await getAccessibilityViolations(element, options)
  return violations.length === 0
}

/**
 * Development helper to add accessibility audit button to the page
 * Only works in development mode
 */
export function addAccessibilityAuditButton(): void {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  // Remove existing button if present
  const existingButton = document.getElementById('axe-audit-button')
  if (existingButton) {
    existingButton.remove()
  }

  const button = document.createElement('button')
  button.id = 'axe-audit-button'
  button.innerHTML = '🔍 Audit A11y'
  button.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: #1f2937;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `
  
  button.addEventListener('click', async () => {
    button.innerHTML = '⏳ Auditing...'
    button.disabled = true
    
    try {
      await runAccessibilityAudit()
    } finally {
      button.innerHTML = '🔍 Audit A11y'
      button.disabled = false
    }
  })
  
  document.body.appendChild(button)
} 