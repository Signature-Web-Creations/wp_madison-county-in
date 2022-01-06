// this is a redirect file
export default function(ctx) {
  if(ctx.route.fullPath.match(/(gis)(\/)?/i))(
    ctx.redirect(301, '/government/human-resources')
  )
}

