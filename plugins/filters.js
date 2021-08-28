import Vue from "vue"

Vue.filter("formatDate", function (value, moment, formatTemplate) {
  if (!value) return ""

  if (value !== "Closed") {
    return moment(value).format(formatTemplate)
  } else {
    return value
  }
})

Vue.filter("truncateText", function (value, charLimit) {
  if (!value) return ""

  if (charLimit > value.length) {
    return value
  } else {
    value = value.substring(0, charLimit)
    return value + "..."
  }
})

Vue.filter("lowerCase", function (value) {
  if (!value) return ""
  value = value.toString()
  return value.toLowerCase()
})
