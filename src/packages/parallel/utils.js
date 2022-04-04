export const formatData = (values, metrics, dimension) => {
  const dataTemp = {}
  values.forEach(row => {
    dataTemp[row[dimension]] = []
    metrics.forEach(item => {
      dataTemp[row[dimension]].push(row[item])
    })
  })
  return dataTemp
}

export const getMaxData = (values, dimension) => {
  const datas = values.map((v, i) => {
    return v[dimension]
  })
  const maxData = Math.round(Math.max(...datas)).toString()
  const num = Number(maxData.substring(0, 1)) + 1
  return num * Math.pow(10, maxData.length - 1)
}
