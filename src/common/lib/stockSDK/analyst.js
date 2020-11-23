function ema (lastEma, closePrice, units) {
  return (lastEma * (units - 1) + closePrice * 2) / (units + 1)
}

function dea (lastDea, curDiff) {
  return (lastDea * 8 + curDiff * 2) / 10
}

function macd (ticks) {
  const ema12 = []
  const ema26 = []
  const diffs = []
  const deas = []
  const macds = []
  ticks.forEach((c, i) => {
    if (i === 0) {
      ema12.push(c)
      ema26.push(c)
      deas.push(0)
    } else {
      ema12.push(ema(ema12[i - 1], c, 12))
      ema26.push(ema(ema26[i - 1], c, 26))
    }
    diffs.push(ema12[i] - ema26[i])
    if (i !== 0) {
      deas.push(dea(deas[i - 1], diffs[i]))
    }
    macds.push((diffs[i] - deas[i]) * 2)
  })

  return {
    macds,
    diffs,
    deas
  }
}

module.exports = {
  macd
}
