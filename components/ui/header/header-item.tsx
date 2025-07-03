"use client"

interface HeaderItemProps {
  children: React.ReactNode;
}

export default function HeaderItem({ children }: HeaderItemProps) {
 return (
        <a href="#" className="text-[#1A475F] border-inside border-[#1A475F] py-3 text-sm font-medium">
            {children}
        </a>
    )
}