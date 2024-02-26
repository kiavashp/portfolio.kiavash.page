// projects - image-viewer
const projects = document.getElementById('projects');
const imageViewer = document.getElementById('image-viewer');
const viewer = {
    isOpen: false,
    open(img) {
        imageViewer.innerHTML = '';
        imageViewer.appendChild(img);
        imageViewer.classList.toggle('-open', true);
        document.body.classList.toggle('-lock-scroll', true);
        this.isOpen = true;
    },
    close() {
        imageViewer.classList.toggle('-open', false);
        imageViewer.innerHTML = '';
        document.body.classList.toggle('-lock-scroll', false);
        this.isOpen = false;
    }
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && viewer.isOpen) {
        viewer.close();
    }
});

imageViewer.addEventListener('click', (event) => {
    if (event.target === imageViewer) {
        viewer.close();
    }
});

projects.addEventListener('click', (event) => {
    if (event.target.classList && event.target.classList.contains('project-image')) {
        const projectImage = event.target;

        if (projectImage.classList.contains('-noexpand')) {
            return;
        }

        viewer.open(projectImage.cloneNode());
    }
});
