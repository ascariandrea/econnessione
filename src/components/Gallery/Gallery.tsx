import * as React from "react"

interface GalleryProps {
  images: any[]
}

const Gallery: React.FC<GalleryProps> = props => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]
  return (
    <div className="gallery">
      {children
        .filter(c => c !== "\n")
        .map(c => {
          return c
        })}
    </div>
  )
}

export default Gallery
