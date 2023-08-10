/**
 * 封装API返回体
 * @param {any} data 
 * @param {Number} code 
 * @param {String} msg 
 * @returns 
 */
function api(data = undefined, code = 0, msg = '') {
  return {
    data, code, msg
  }
}

/**
 * 按需更新
 * @param {Object} body 
 * @param {Array} exclude 
 * @returns {String}
 */
function updateOnDemand(body = {}, exclude = []) {
  const result = []
  for (const [key, value] of Object.entries(body)) {
    if (exclude.includes(key)) continue;
    result.push(`${key}='${value}'`)
  }
  result.join(',')
  return result;
}

module.exports = {
  api,
  updateOnDemand
}