const attrParser = require('./libs/attr')
const date = require('./libs/date')

function daterange(value) {
  const data = attrParser(value)

  if (data.startDate) data.startDate = date(data.startDate)
  if (data.endDate) data.endDate = date(data.endDate)
  if (data.duration) data.duration = parseFloat(data.duration)
  if (data.plannedDuration) data.plannedDuration = parseFloat(data.plannedDuration)

  return data;
}

module.exports = daterange
