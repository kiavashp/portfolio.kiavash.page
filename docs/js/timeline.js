// timeline - click to scroll
const timeline = document.getElementById('timeline');

timeline.addEventListener('click', (event) => {
    if (event.target.classList.contains('project-dot')) {
        const projectId = event.target.getAttribute('data-project-id');
        const project = document.getElementById(projectId);

        project.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }
});

// timeline - scroll indicator
const mainContent = document.getElementById('content');
const scrollIndicator = document.getElementById('timeline-scroll-indicator');

const TIMELINE_INDICATOR_OFFSET = 16;
const lastIndicatorPos = {
    top: TIMELINE_INDICATOR_OFFSET,
    height: 8
};

const updateScrollIndicator = () => {
    const timelineScrollHeight = timeline.clientHeight - (TIMELINE_INDICATOR_OFFSET * 2);
    const CONTENT_START = mainContent.offsetTop;
    const CONTENT_HEIGHT = mainContent.clientHeight;
    const CONTENT_END = CONTENT_START + CONTENT_HEIGHT;
    const VIEW_START = window.scrollY;
    const VIEW_HEIGHT = window.innerHeight;
    const VIEW_END = VIEW_START + VIEW_HEIGHT;

    let indicatorTop;
    let indicatorHeight;

    // calc top in content px
    if (CONTENT_START > VIEW_START) {
        indicatorTop = 0;
    } else if (VIEW_START > CONTENT_END) {
        indicatorTop = CONTENT_HEIGHT;
    } else {
        indicatorTop = VIEW_START - CONTENT_START;
    }

    // calc height in content px
    if (CONTENT_START > VIEW_START) {
        indicatorHeight = VIEW_HEIGHT - (CONTENT_START - VIEW_START);
    } else if (CONTENT_END < VIEW_END) {
        indicatorHeight = CONTENT_END - VIEW_START;
    } else {
        indicatorHeight = VIEW_HEIGHT;
    }

    // transform content position to timeline position
    indicatorTop = (TIMELINE_INDICATOR_OFFSET + (indicatorTop / CONTENT_HEIGHT * timelineScrollHeight)).toFixed(1);
    indicatorHeight = (indicatorHeight / CONTENT_HEIGHT * timelineScrollHeight).toFixed(1);

    if (indicatorHeight !== lastIndicatorPos.height || lastIndicatorPos.top !== indicatorTop) {
        lastIndicatorPos.top = indicatorTop;
        lastIndicatorPos.height = indicatorHeight;
        scrollIndicator.style.setProperty('--local-top', `${indicatorTop}px`);
        scrollIndicator.style.setProperty('--local-height', `${indicatorHeight}px`);
    }
};

window.addEventListener('scroll', updateScrollIndicator, {capture: true, passive: true});
window.addEventListener('resize', updateScrollIndicator, {capture: true, passive: true});
updateScrollIndicator();
