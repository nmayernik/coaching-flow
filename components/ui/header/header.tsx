"use client"

import { Search, Plus, Users, HelpCircle, Grid3X3, User, ChevronLeft, ChevronRight, Grip } from "lucide-react"
import { useState } from "react"
import Logo from "@/components/ui/logo"
import HeaderItem from "./header-item"


export default function Header() {
 return ( 
    <header className="bg-[#ffffff] border-b border-[#dddddd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-x-8 gap-y-2">
            <div className="flex items-end gap-x-2 pt-2">
              <Logo />
                <div className="text-[#1A475F] text-sm">College Coach</div>
            </div>

            <nav className="hidden md:flex gap-x-6">
              <HeaderItem>Home</HeaderItem>
              <HeaderItem>Presentations</HeaderItem>
              <HeaderItem>Appointments</HeaderItem>
              <HeaderItem>Questions</HeaderItem>
              <HeaderItem>Essay Reviews</HeaderItem>
              <HeaderItem>College Lists</HeaderItem>
              <HeaderItem>Resource Library</HeaderItem>
              <HeaderItem>Benefit Overview</HeaderItem>
            </nav>
          </div>

          <div className="flex items-center gap-x-5">
            <HelpCircle className="w-5.5 h-5.5 text-[#1A475F]" />
            <Grip className="w-5.5 h-5.5 text-[#1A475F]" />
            <User className="w-5.5 h-5.5 text-[#1A475F]" />

          </div>
        </div>
      </div>
    </header>
    )
}