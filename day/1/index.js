export default async function getColor(url) {
  const img = await getImage(url)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  const PXdata = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  return getCountColor(PXdata, 4 * (parseInt(canvas.width / 9) <= 1 ? 1 : parseInt(canvas.width / 9)))
}

const getImage = url => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.crossOrigin = ''
    img.src = url
  })
}

const getCountColor = (data, frequency) => {
  const rgba = []
  let rgbaStr = ''
  const colorList = {}
  const arr = []
  for (let i = 0; i < data.length; i += frequency) {
    rgba[0] = data[i]
    rgba[1] = data[i + 1]
    rgba[2] = data[i + 2]
    rgba[3] = Math.floor(data[i + 3] / 255)
    rgbaStr = rgba.join()
    if (colorList[rgbaStr]) {
      colorList[rgbaStr] += 1
    } else {
      colorList[rgbaStr] = 1
    }
  }
  for (const prop in colorList) {
    arr.push({
      color: prop,
      count: colorList[prop],
    })
  }
  arr.sort((a, b) => b.count - a.count)
  console.log(arr)
  return arr.find(res => res.color !== '0,0,0,0' && res.color !== '255,255,255,255').color
}
