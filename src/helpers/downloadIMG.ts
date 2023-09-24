export default function downloadIMG(
  svgParentNode: HTMLDivElement,
  widthImg: number,
  heightImg: number,
  format: string,
  startWithFileName: string
): void {
  const svgInnerHTML = svgParentNode.innerHTML
  const imgSrc = 'data:image/svg+xml;base64,' + btoa(svgInnerHTML)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.setAttribute('width', String(widthImg))
  canvas.setAttribute('height', String(heightImg))

  const image = new Image()
  image.src = imgSrc
  image.addEventListener('load', createLink)

  function createLink(): void {
    context?.drawImage(image, 0, 0)
    const canvasData = canvas.toDataURL(`image/${format}`)
    const a = document.createElement('a')
    a.download = `${startWithFileName}${Date.now()}.${format}`
    a.href = canvasData
    a.click()
    image.removeEventListener('load', createLink)
  }
}
