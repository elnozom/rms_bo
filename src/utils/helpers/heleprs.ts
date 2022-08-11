import colors from './colors'

export const switchLanguage = (locale: string, ctx: any) => {
  localStorage.setItem("locale", locale);
  ctx.$vuetify.rtl = locale === "ar";
  ctx.$vuetify.lang.current = locale;
  ctx.$i18n.locale = locale;
};


export const numberWithCommas = (x: number) => {
  if (typeof x == 'undefined'){
    return 0
  }
  const xFixed = x.toFixed(3) 
  const val = xFixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return val
}
export const generateColors = (n: number) => {
  const c = colors
  c.length = n
  return c
}

export const clearNullValues = (obj: Object) => {
  const clone = { ...obj }
  Object.keys(clone).forEach((key) => {
    const k = key as keyof typeof clone
    clone[k] === null || '' ? delete clone[k] : ''
  })
  return clone
}
export const currentYear = new Date().getFullYear();

export const currentMonth = new Date().getMonth() + 1

export const currentDay = new Date().getDay()

export const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

export const lastTenYearsArr = (): number[] => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    arr.push(currentYear - i)
  }

  return arr
}

export const switchMode = (mode: string, ctx: any) => {
  localStorage.setItem("mode", mode);
  ctx.$vuetify.theme.dark = mode === "dark";
};



export const currency = (price :any) => {
  return `EGP ${price}`
};


export const serializeQuery = (payload: Object) => {
  const obj = clearNullValues(payload)
  const keys = Object.keys(obj)
  // const key as keyof obj
  return keys.map((k: any) => {
    const key = k as keyof typeof obj
    const current = obj[key] as unknown as string
    return `${encodeURIComponent(key)}=${encodeURIComponent(current)}`
  }).join("&")
}

export const addParamsToLocation = (params: object, path: string) => {
  history.pushState(
    {},
    '',
    path +
    '?' +
    Object.keys(clearNullValues(params))
      .map(key => {
        const k = key as keyof typeof params
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(params[k])
        )
      })
      .join('&')
  )
}
export const removeBasePathFromImage = (fullPath : string) :string => {
  const path = `assets${fullPath.split('assets')[1]}`
  return path

}
export const getColor = (index: number) => {
  return colors[index]
}


// export const createChart()

export const required = (v: any) => !!v || 'required'

export const convertDate = (date :string) => {
  const d = new Date(date);
  // const formattedDate = ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
  const formattedDate = d.toUTCString()
  return formattedDate.substring(0 , formattedDate.length-3)
}



export const getParamsFromLocation = (query:any , form:any) => {
  const qKeys = Object.keys(query)
  qKeys.forEach(key => {
    if(key in form.state && query[key] != 'null') {
        form.state[key] = typeof form.state[key] == 'string' ? query[key] : parseInt(query[key])
    }
  })
}