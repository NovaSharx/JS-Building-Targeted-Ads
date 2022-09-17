// get user's data
// get user's coordinates
async function getCoords() {
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

// get user's time
// helper functions
// check time of day
function userTime() {
    const now = new Date()
    return now.getHours()
}

function getMealTime() {
    const tod = userTime()

    if (tod > 20) { return 'late-night snack' }
    else if (tod > 16) { return 'dinner' }
    else if (tod > 11) { return 'lunch' }
    else { return 'breakfast' }
}

// build ads
// build ad 1

function buildAd1() {
    const mealTime = getMealTime()
    let content = document.querySelector('.ad1')
    let inner = document.createElement('p')
    inner.innerHTML = `We've got the best <span>${mealTime}</span> in town.`
    content.append(inner)
}

// build ad 2
function buildAd2(coordinates) {
    const coords = coordinates
    const href = `https://www.google.com/maps/search/coffee/@${coords[0]},${coords[1]},15z/`
    let content = document.querySelector('.ad2')
    let inner = document.createElement('p')
    inner.innerHTML = `It's time to try our coffee! <span><a href="${href}" target="_blank">We're this close!</a></span>`
    content.append(inner)
}

// event listeners
// on load, build ads

window.onload = async () => {
    buildAd1()
    const coords = await getCoords().catch(error => {
        if (error.code === 1) {
            window.alert(`The acquisition of the geolocation information failed because the page didn't have the permission to do it.`)
        }
        else if (error.code === 2) {
            window.alert(`The acquisition of the geolocation failed because at least one internal source of position returned an internal error.`)
        }
        else if (error.code === 3) {
            window.alert(`The time allowed to acquire the geolocation was reached before the information was obtained.`)
        }
    })
    if (coords) {buildAd2(coords)}
}

