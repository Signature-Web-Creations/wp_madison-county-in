// this is a redirect file
export default ({route, redirect, error}) => {
  console.log(error(500));
  if(route.fullPath.match(/(gis)(\/)?/i))(
    redirect("https://www.arcgis.com/apps/webappviewer/index.html?id=09bf2f0e07a243ffb262793cf106cd01")
  )
}

