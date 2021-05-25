export default async ({store}) => 
{
    await store.dispatch('getlandingPages')
    await store.dispatch('getHome')
    await store.dispatch('gethomeMenus')
    await store.dispatch('gethomeFeatures')
    await store.dispatch('getOffices')
    await store.dispatch('getcategories')
    await store.dispatch('getTags')
    await store.dispatch('getfeaturedImages')
    await store.dispatch('getcountyProfiles', {
        featuredImages: store.state.featuredImages 
    })
    await store.dispatch('getcategoriesWithPosts', {
        categories: store.state.categories, 
        featuredImages: store.state.featuredImages, 
        landingPages: store.state.landingPages,
        offices: store.state.offices
    })
    
}