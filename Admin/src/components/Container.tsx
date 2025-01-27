import React from 'react'

const Container = (component: any) => {
  return (
    <div className="w-full h-full p-2">
        {component.children}
    </div>
  )
}

export default Container