/* Initialize Videos When in Viewport */
(function() {
  try {
    const playVideoElement = (videoElement) => {
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        return playPromise
          .then(() => { console.log("Video is now playing."); })
          .catch(error => { console.warn("Error playing the video:", error); });
      }
    };

    const videoObserverOptions = { root: null, rootMargin: "0px", threshold: 0 };
    const videoIntersectionObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        const shouldAutomaticallyPlay = !entry.target.dataset.manualControl;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("source").forEach(function(sourceElement) {
            if (sourceElement.dataset.src) {
              sourceElement.src = sourceElement.dataset.src;
              delete sourceElement.dataset.src;
              entry.target.load();
            }
          });
          shouldAutomaticallyPlay && playVideoElement(entry.target);
        }
        else {shouldAutomaticallyPlay && entry.target.pause() || console.log("Video paused.");}
      });
    }, videoObserverOptions);

    function initializeVideoElements() {
      Array.from(document.querySelectorAll("video"))
        .filter(videoElement => !videoElement.className.includes("video-initialized") && !videoElement.hasAttribute("data-ignore-intersection"))
        .forEach(videoElement => {
          videoElement.className += " video-initialized";
          videoIntersectionObserver.observe(videoElement);
        });
    }

    initializeVideoElements();
  }
  catch (error) {console.error("Error in the video observer script:", error);}
})();
