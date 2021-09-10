import Vue from "vue"
import moment from "moment"

Vue.filter("formatDate", function (value, formatTemplate) {
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

Vue.filter("formatPhone", function (value) {
  if (!value) return ""

  value = value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
  value = !value[2]
    ? value[1]
    : "(" + value[1] + ") " + value[2] + (value[3] ? "-" + value[3] : "")
  return value
})
