function bottomNavbar() {
    return `<div id="bottomNavbar">
    <div id="homeOver" class="overLay">

        <button id="homeIcon" class="navIcon">
            <img src="../icons/navHome.svg" alt="">
            <p>Home</p>
        </button>
    </div>
    <div id="exploreOver" class="overLay">

        <button id="exploreIcon" class="navIcon">
            <img src="../icons/navXplor.svg" alt="">
            <p>Explore</p>
        </button>
    </div>
    <div id="claimOver" class="overLay">

        <button id="claimIcon" class="navIcon">
            <img src="../icons/claimNav.svg" alt="">
            <p>Claim</p>
        </button>
    </div>
    <div id="profileOver" class="overLay">

        <button id="profileIcon" class="navIcon">
            <img src="../icons/profileNav.svg" alt="">
            <p>Profile</p>
        </button>
    </div>
    <div id="moreOver" class="overLay">

        <button id="moreIcon" class="navIcon">
            <img src="../icons/moreNav.svg" alt="">
            <p>More</p>
        </button>
    </div>
</div>`;
}

function loadNavbar() {
    let homeIcon = document.getElementById('homeIcon');
    let exploreIcon = document.getElementById('exploreIcon')
    let claimIcon = document.getElementById('claimIcon')
    let profileIcon = document.getElementById('profileIcon')
    let moreIcon = document.getElementById('moreIcon')

    homeIcon.onclick = () => {
        window.location = "./home_navigation.htm";
    }
    exploreIcon.onclick = () => {
        window.location = "Explore2.html";
    }
    profileIcon.onclick = () => {
        window.location = "./profile.htm";
    }
    claimIcon.onclick = () => {
        window.location = "./directClaim.html";
    }
    moreIcon.onclick = () => {
        window.location = "./more.html";
    }
}

export {bottomNavbar, loadNavbar};