"use client"

import { useState } from 'react'
import { ChevronRight, Copy, Check, BookOpen, Palette, Type, Code, Zap, Users, FileText, Menu, X, Monitor, Tablet, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HandoffPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(text)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const navigationItems = [
    { id: 'responsive', label: 'Responsive Layout', icon: Monitor, color: 'text-green-500' },
    { id: 'components', label: 'Components', icon: Code, color: 'text-purple-500' }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setSidebarOpen(false)
  }

  const [studentCardState, setStudentCardState] = useState({
    isSelected: false,
    sessionsAvailable: 3,
  })

  const [buttonState, setButtonState] = useState({
    variant: 'primary' as 'primary' | 'secondary' | 'tertiary',
    size: 'default' as 'default' | 'sm' | 'lg',
  })

  const getButtonVariantSpecs = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-yellow-500 hover:bg-yellow-400 text-blue-800 font-semibold'
      case 'secondary':
        return 'border border-gray-300 bg-background text-blue-700 hover:bg-blue-25'
      case 'tertiary':
        return 'text-blue-700 hover:bg-blue-50'
      default:
        return ''
    }
  }

  const getButtonSizeSpecs = (size: string) => {
    switch (size) {
      case 'sm':
        return 'h-9 rounded-md px-3'
      case 'lg':
        return 'h-11 rounded-md px-8'
      default:
        return 'h-10 px-4 py-2'
    }
  }

  return (
    <div className="min-h-screen bg-gray-25">
      {/* Mobile Header */}
      <header className="lg:hidden border-b border-gray-200 bg-white">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800">Design System</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-800">Design System</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="/"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>Back to App</span>
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">Developer Handoff</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Complete design system documentation for the College Coach application. 
                This guide provides responsive layout patterns and component details for developers.
              </p>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.id}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <IconComponent className={`w-8 h-8 ${item.color} mb-3`} />
                    <h3 className="font-semibold text-gray-800 mb-2">{item.label}</h3>
                    <p className="text-sm text-gray-600">
                      {item.id === 'responsive' && 'Breakpoint layouts and responsive patterns'}
                      {item.id === 'components' && 'UI components and patterns'}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Responsive Layout Section */}
            <div id="responsive" className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Responsive Layout</h2>
              
              {/* Breakpoints */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Breakpoints</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Smartphone className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Mobile</span>
                    </div>
                    <p className="text-sm text-gray-600">0px - 767px</p>
                    <code className="text-xs text-gray-500">sm: (min-width: 640px)</code>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Tablet className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Tablet</span>
                    </div>
                    <p className="text-sm text-gray-600">768px - 1023px</p>
                    <code className="text-xs text-gray-500">md: (min-width: 768px)</code>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Monitor className="w-5 h-5 text-purple-500" />
                      <span className="font-medium">Desktop</span>
                    </div>
                    <p className="text-sm text-gray-600">1024px+</p>
                    <code className="text-xs text-gray-500">lg: (min-width: 1024px)</code>
                  </div>
                </div>
              </div>

              {/* Layout Patterns */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Layout Patterns</h3>
                  
                  {/* Sidebar Layout */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-800 mb-3">Sidebar Layout</h4>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <code className="text-sm text-gray-700">
{`<div className="flex">
  <div className="hidden lg:block w-64 bg-white border-r">
    {/* Sidebar content */}
  </div>
  <div className="flex-1">
    {/* Main content */}
  </div>
</div>`}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Sidebar is hidden on mobile, visible on desktop (lg:block)</p>
                    
                    {/* Visual Example */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                        Visual Example
                      </div>
                      <div className="p-4">
                        <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <div className="hidden lg:block w-32 bg-blue-50 border-r border-gray-200 p-3">
                            <div className="space-y-2">
                              <div className="h-3 bg-blue-200 rounded"></div>
                              <div className="h-3 bg-blue-200 rounded w-3/4"></div>
                              <div className="h-3 bg-blue-200 rounded w-1/2"></div>
                            </div>
                          </div>
                          <div className="flex-1 p-3">
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded"></div>
                              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="lg:hidden">📱 Mobile: Sidebar hidden</span>
                          <span className="hidden lg:inline">🖥️ Desktop: Sidebar visible</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grid Layout */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-800 mb-3">Responsive Grid</h4>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <code className="text-sm text-gray-700">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>`}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">1 column on mobile, 2 on tablet, 3 on desktop</p>
                    
                    {/* Visual Example */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                        Visual Example
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="h-20 bg-blue-100 rounded-lg flex items-center justify-center text-sm text-blue-700">
                            Item 1
                          </div>
                          <div className="h-20 bg-green-100 rounded-lg flex items-center justify-center text-sm text-green-700">
                            Item 2
                          </div>
                          <div className="h-20 bg-purple-100 rounded-lg flex items-center justify-center text-sm text-purple-700">
                            Item 3
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="block md:hidden">📱 Mobile: 1 column</span>
                          <span className="hidden md:block lg:hidden">📱 Tablet: 2 columns</span>
                          <span className="hidden lg:block">🖥️ Desktop: 3 columns</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-First Navigation */}
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-800 mb-3">Mobile-First Navigation</h4>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <code className="text-sm text-gray-700">
{`<header className="lg:hidden">
  {/* Mobile header with hamburger */}
</header>
<div className="hidden lg:block">
  {/* Desktop navigation */}
</div>`}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Different navigation patterns for mobile vs desktop</p>
                    
                    {/* Visual Example */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                        Visual Example
                      </div>
                      <div className="p-4">
                        {/* Mobile Navigation */}
                        <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <div className="h-6 bg-blue-200 rounded w-24"></div>
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">📱 Mobile: Hamburger menu</div>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden lg:block bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center space-x-4">
                            <div className="h-6 bg-blue-200 rounded w-20"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">🖥️ Desktop: Horizontal navigation</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Container Responsive */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Responsive Container</h4>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <code className="text-sm text-gray-700">
{`<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content with responsive padding */}
</div>`}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Centered container with responsive horizontal padding</p>
                    
                    {/* Visual Example */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b">
                        Visual Example
                      </div>
                      <div className="p-4">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded"></div>
                              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="block sm:hidden">📱 Mobile: px-4 (16px)</span>
                          <span className="hidden sm:block lg:hidden">📱 Tablet: px-6 (24px)</span>
                          <span className="hidden lg:block">🖥️ Desktop: px-8 (32px)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Responsive Patterns */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Common Responsive Patterns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Text Responsive */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Responsive Text</h4>
                    <div className="space-y-2 mb-3">
                      <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                        Responsive Heading
                      </div>
                      <code className="text-xs text-gray-600">text-lg md:text-xl lg:text-2xl</code>
                    </div>
                    <p className="text-sm text-gray-600">Text scales up on larger screens</p>
                  </div>

                  {/* Spacing Responsive */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Responsive Spacing</h4>
                    <div className="space-y-2 mb-3">
                      <div className="p-4 md:p-6 lg:p-8 bg-blue-100 rounded-lg">
                        <div className="text-sm text-blue-700">Responsive padding</div>
                      </div>
                      <code className="text-xs text-gray-600">p-4 md:p-6 lg:p-8</code>
                    </div>
                    <p className="text-sm text-gray-600">Padding increases on larger screens</p>
                  </div>

                  {/* Image Responsive */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Responsive Images</h4>
                    <div className="space-y-2 mb-3">
                      <div className="w-full h-20 md:h-24 lg:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">Image</span>
                      </div>
                      <code className="text-xs text-gray-600">h-20 md:h-24 lg:h-32</code>
                    </div>
                    <p className="text-sm text-gray-600">Height scales with screen size</p>
                  </div>

                  {/* Flex Responsive */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Responsive Flex</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 h-8 bg-blue-200 rounded"></div>
                        <div className="flex-1 h-8 bg-green-200 rounded"></div>
                      </div>
                      <code className="text-xs text-gray-600">flex-col md:flex-row</code>
                    </div>
                    <p className="text-sm text-gray-600">Stacked on mobile, side-by-side on desktop</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Components Section - Buttons */}
            <div id="components" className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Components</h2>
              <div className="space-y-8">
                
                {/* Student Card */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Student Card</h3>
                  
                  {/* Interactive Component Switcher */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Controls Section */}
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">isSelected:</span>
                            <button
                              onClick={() => setStudentCardState(prev => ({ ...prev, isSelected: !prev.isSelected }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                studentCardState.isSelected ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  studentCardState.isSelected ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">sessionsAvailable:</span>
                            <select
                              value={studentCardState.sessionsAvailable}
                              onChange={(e) => setStudentCardState(prev => ({ ...prev, sessionsAvailable: parseInt(e.target.value) }))}
                              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                            >
                              <option value={3}>3</option>
                              <option value={2}>2</option>
                              <option value={1}>1</option>
                              <option value={0}>0</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Component Preview */}
                    <div className="p-6 bg-white">
                      <div className="flex justify-center">
                        <div className={`p-3 md:p-4 rounded-2xl lg:rounded-xl border transition-colors duration-200 ease-out flex flex-col justify-between shadow-sm touch-manipulation h-32 w-48 ${
                          studentCardState.sessionsAvailable === 0
                            ? "border-gray-200 bg-gray-25 cursor-not-allowed"
                            : studentCardState.isSelected 
                              ? "ring-blue-700 ring-2 border-0 hover:bg-blue-50 active:bg-blue-100 cursor-pointer" 
                              : "border-gray-400 hover:bg-gray-25 active:bg-gray-50 cursor-pointer"
                        }`}>
                          <div className="flex flex-col">
                            <div className={`font-medium ${studentCardState.sessionsAvailable === 0 ? 'text-gray-500' : 'text-gray-800'}`}>Nick</div>
                            <div className={`text-sm ${studentCardState.sessionsAvailable === 0 ? 'text-gray-400' : 'text-gray-700'}`}>12th grade</div>
                          </div>
                          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            studentCardState.sessionsAvailable === 0 
                              ? 'bg-gray-100 text-gray-500' 
                              : 'bg-blue-50 text-blue-700'
                          }`}>
                            {studentCardState.sessionsAvailable}/3 sessions available
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CSS Specs Section */}
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-2">specs (css)</div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Height: 128px (h-32)</div>
                        <div>Padding: p-3 md:p-4 (responsive)</div>
                        <div>Border radius: rounded-2xl lg:rounded-xl</div>
                        <div>Shadow: shadow-sm</div>
                        <div>Border: {studentCardState.isSelected ? 'ring-blue-700 ring-2' : studentCardState.sessionsAvailable === 0 ? 'border-gray-200' : 'border-gray-400'}</div>
                        <div>Background: {studentCardState.sessionsAvailable === 0 ? 'bg-gray-25' : 'bg-white'}</div>
                        <div>Text color: {studentCardState.sessionsAvailable === 0 ? 'text-gray-500/400' : 'text-gray-800/700'}</div>
                        <div>Badge: {studentCardState.sessionsAvailable === 0 ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-700'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Buttons</h3>
                  
                  {/* Interactive Component Switcher */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Controls Section */}
                    <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">variant:</span>
                            <select
                              value={buttonState.variant}
                              onChange={(e) => setButtonState(prev => ({ ...prev, variant: e.target.value as 'primary' | 'secondary' | 'tertiary' }))}
                              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                            >
                              <option value="primary">primary</option>
                              <option value="secondary">secondary</option>
                              <option value="tertiary">tertiary</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">size:</span>
                            <select
                              value={buttonState.size}
                              onChange={(e) => setButtonState(prev => ({ ...prev, size: e.target.value as 'default' | 'sm' | 'lg' }))}
                              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
                            >
                              <option value="default">default</option>
                              <option value="sm">sm</option>
                              <option value="lg">lg</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Component Preview */}
                    <div className="p-6 bg-white">
                      <div className="flex justify-center">
                        <Button variant={buttonState.variant} size={buttonState.size}>
                          {buttonState.variant === 'primary' && 'Primary Action'}
                          {buttonState.variant === 'secondary' && 'Secondary'}
                          {buttonState.variant === 'tertiary' && 'Tertiary'}
                        </Button>
                      </div>
                    </div>

                    {/* CSS Specs Section */}
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-2">specs (css)</div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Base: inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium</div>
                        <div>Transition: transition-colors duration-200 ease-out</div>
                        <div>Focus: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2</div>
                        <div>Disabled: disabled:pointer-events-none disabled:bg-gray-50 disabled:text-gray-500</div>
                        <div>Variant: {getButtonVariantSpecs(buttonState.variant)}</div>
                        <div>Size: {getButtonSizeSpecs(buttonState.size)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 