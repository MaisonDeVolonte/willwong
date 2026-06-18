// Reach Header
console.log('--');
console.log('%c%s','font-weight: bold;font-size:1.3em;',location.hostname.toUpperCase());
console.log('Powered By Reach');
console.log('Data Driven Marketing');
console.log('Request a performance review at consultations@choosereach.com');
console.log('Version 1.0.3');
console.log('--');

// Store marketing tags for use by Rudderstack on subsequent page loads.
var urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());
var rudderstackCampaignDetails = {}
Object.keys(params).forEach(key => {
    if (key.includes("utm") || key.includes("gclid") || key.includes("fbclid")) {
        rudderstackCampaignDetails[key.replace("utm_", "")] = params[key]
    }
});
if (Object.keys(rudderstackCampaignDetails).length > 0) {
    localStorage.setItem("reach.rudderstackCampaignDetails", JSON.stringify(rudderstackCampaignDetails))
}
var maybeRudderstackCampaignDetails = localStorage.getItem("reach.rudderstackCampaignDetails")
var rudderstackCampaignDetails = !!maybeRudderstackCampaignDetails ? JSON.parse(maybeRudderstackCampaignDetails) : undefined

// Load RudderStack
!function(){var e=window.rudderanalytics=window.rudderanalytics||[];e.methods=["load","page","track","identify","alias","group","ready","reset","getAnonymousId","setAnonymousId"],e.factory=function(t){return function(){var r=Array.prototype.slice.call(arguments);return r.unshift(t),e.push(r),e}};for(var t=0;t<e.methods.length;t++){var r=e.methods[t];e[r]=e.factory(r)}e.loadJS=function(e,t){var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.rudderlabs.com/v1/rudder-analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a)},e.loadJS(),
    e.load(reachConfig.writeKey, "https://choosereacsjnd.dataplane.rudderstack.com"),
    e.page('Page Loaded')}();

// Helper function adds utm information to Rudderstack context
const rudderstackTrack = (event, properties) => {
    if (!!rudderstackCampaignDetails) {
        // If we have stored campaign details, add them to the track call context
        rudderanalytics.track(event, properties, {context: {campaign: rudderstackCampaignDetails}});
    } else {rudderanalytics.track(event, properties);}
}


// Element Definitions
const
    buttonElements = Array.from(document.querySelectorAll("button,a.button,.w-button,.w-nav-button,.w-dropdown-toggle,[data-reach-track='button'],input[type='submit']")),
    linkElements = Array.from(document.querySelectorAll("a")).filter(linkElement => !buttonElements.includes(linkElement)),
    sectionElements = document.querySelectorAll("section,[data-reach-track='section']"),
    menuElements = document.querySelectorAll(".w-dropdown-list,.w-nav-menu,[data-reach-track='menu']"),
    lightboxElements = document.querySelectorAll(".w-lightbox-container,[data-reach-track='lightbox']"),
    cartElements = document.querySelectorAll(".w-commerce-commercecartcontainerwrapper,[data-reach-track='cart']"),
    formElements = document.querySelectorAll("form,[data-reach-track='form']"),
    inputElements = document.querySelectorAll("input:not(.w-button), select, textarea,[data-reach-track='input']"),
    specialElements = document.querySelectorAll("[data-reach-track='impression']"),
    imageElements = document.querySelectorAll("img,[data-reach-track='image']"),
    zoomElements = document.querySelectorAll("[data-action='zoom']"),
    tooltipElements = document.querySelectorAll(".tooltip"),
    scrollWrapper = document.querySelector('main'),
    scrollTracker = document.getElementById('scrollTracker'),
    scrollElements = document.querySelectorAll('[data-reach-scroll]');


// // Page Scrolled
// pageScrolledObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const pageScrolledProperties = {
//             scroll_depth: entry.target.dataset.reachScroll
//             //scroll_direction (@nathan)
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Page Scrolled', pageScrolledProperties);
//             console.log('Page Scrolled: ' + entry.target.dataset.reachScroll + '%', pageScrolledProperties);
//         }
//     });
// });
// scrollElements.forEach(scroll => {pageScrolledObserver.observe(scroll)})


// // Element Viewed
// elementViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const elementViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_href: entry.target.href,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Element Viewed', elementViewedProperties);
//             console.log('Element Viewed:', entry.target.id, elementViewedProperties);
//         }
//     });
// });
// specialElements.forEach(impression => {elementViewedObserver.observe(impression);});


// // Button Viewed
// buttonViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const buttonViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_href: entry.target.href,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Button Viewed', buttonViewedProperties);
//             console.log('Button Viewed:', entry.target.id, buttonViewedProperties);
//         }
//     });
// });
// buttonElements.forEach(impression => {buttonViewedObserver.observe(impression);});


// // Button Hovered
// for (var i = 0 ; i < buttonElements.length; i++) {
//     const buttonElement = buttonElements[i];
//     buttonElement.addEventListener('mouseenter', event => {
//         let mouseExitListener;

//         const mouseEnterTimer = window.setTimeout(function(){
//             const buttonHoveredProperties = {
//                 element_id: event.target.id,
//                 element_class: event.target.className,
//                 element_href: event.target.href,
//                 element_tag: event.target.tagName.toLowerCase()
//             };
//             rudderstackTrack('Button Hovered', buttonHoveredProperties);
//             console.log('Button Hovered:', event.target.id, buttonHoveredProperties);
//             buttonElement.removeEventListener('mouseleave', mouseExitListener)
//         }, 500);
//         mouseExitListener = buttonElement.addEventListener('mouseleave', event => {
//             window.clearTimeout(mouseEnterTimer)
//         })
//     })
// };

// Button Clicked
function trackButtonClick(element) {
    var clickedButton = element;

    const buttonClickProperties = {
        element_id: clickedButton.id,
        element_class: clickedButton.className,
        element_href: clickedButton.href,
        element_tag: clickedButton.tagName.toLowerCase()
    };

    rudderstackTrack('Button Clicked', buttonClickProperties);
    console.log('Button Clicked:', clickedButton.id, buttonClickProperties);
}
buttonElements.forEach(element => {
    element.addEventListener('click', function (event) {
        trackButtonClick(event.currentTarget)
    })
});

// // Fareharbor Button Clicked
// !!window.FH && window.FH.autoLightframe({callback: trackButtonClick});


// Link Clicked
function trackLinkClick(clickedLink) {
    const linkClickProperties = {
        element_id: clickedLink.id,
        element_class: clickedLink.className,
        element_href: clickedLink.href,
        element_tag: clickedLink.tagName.toLowerCase()
    };
    rudderstackTrack('Link Clicked', linkClickProperties);
    console.log('Link Clicked:', clickedLink.id, linkClickProperties);
}
linkElements.forEach(element => {
    element.addEventListener('click', function (event) {
        trackLinkClick(event.currentTarget)
    })
});


// // Section Viewed
// sectionViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const sectionViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Section Viewed', sectionViewedProperties);
//             console.log('Section Viewed:', entry.target.id, sectionViewedProperties);
//         }
//     });
// });
// sectionElements.forEach(impression => {sectionViewedObserver.observe(impression);});

// // Menu Viewed
// menuViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const menuViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Menu Viewed', menuViewedProperties);
//             console.log('Menu Viewed:', entry.target.id, menuViewedProperties);
//         }
//     });
// });
// menuElements.forEach(impression => {menuViewedObserver.observe(impression);});

// //Cart Viewed
// cartViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const cartViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Cart Viewed', cartViewedProperties);
//             console.log('Cart Viewed:', entry.target.id, cartViewedProperties);
//         }
//     });
// });
// cartElements.forEach(impression => {cartViewedObserver.observe(impression);});

// // Lightbox Viewed
// lightboxViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const lightboxViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Lightbox Viewed', lightboxViewedProperties);
//             console.log('Lightbox Viewed', lightboxViewedProperties);
//         }
//     });
// });
// lightboxElements.forEach(impression => {lightboxViewedObserver.observe(impression);});

// // Form Viewed
// formViewedObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         const formViewedProperties = {
//             element_id: entry.target.id,
//             element_class: entry.target.className,
//             element_tag: entry.target.tagName.toLowerCase()
//         };
//         if (entry.isIntersecting) {
//             rudderstackTrack('Form Viewed', formViewedProperties);
//             console.log('Form Viewed:', entry.target.id, formViewedProperties);
//         }
//     });
// });
// formElements.forEach(impression => {formViewedObserver.observe(impression);});

// Form Engaged
function trackFormEngagement(focusedInput) {
    const parentForm = focusedInput.closest('form')
    const inputFocusedProperties = {
        element_id: focusedInput.id,
        element_class: focusedInput.className,
        element_tag: focusedInput.tagName.toLowerCase(),
        element_name: focusedInput.name,
        form_id: !!parentForm && parentForm.id,
        form_name: !!parentForm && parentForm.dataset.name
    };
    rudderstackTrack('Form Engaged', inputFocusedProperties);
    console.log('Form Engaged:', focusedInput.id, inputFocusedProperties);
}
inputElements.forEach(element => {
    element.addEventListener('focus', function (event) {
        trackFormEngagement(event.currentTarget)
    })
});

// Form Submitted
function onFormSubmitted (form,callback) {
    var maybeNameElement = form.querySelector("[name='name'],[name='Name'],[data-reach-track='name']");
    var maybeEmailElement = form.querySelector("[name='email'],[name='Email'],[type='email'],[data-reach-track='email']");
    var maybePhoneElement = form.querySelector("[name='phone'],[name='Phone'],[type='tel'],[data-reach-track='phone']");
    const formProperties = {
        form_id: form.id,
        form_name: form.name,
        formData: JSON.stringify($(form).serializeArray())
    };
    rudderstackTrack('Form Submitted', formProperties);
    console.log('Form Submitted:', form.id, formProperties);
    // Identify the user
    const identity = {
        name: maybeNameElement && maybeNameElement.value,
        email: maybeEmailElement && maybeEmailElement.value,
        phone: maybePhoneElement && maybePhoneElement.value,
    };
    if (!!maybeNameElement || !!maybeEmailElement || !!maybePhoneElement) {
        rudderanalytics.identify(identity);
        console.log('User Profile Updated');
    };
    !!callback && callback()
}
document.addEventListener('submit', function(event){
    if (!event.target.matches('form')) return;
    var form = event.target;
    onFormSubmitted(form)
})

// // Image Hovered
// for (var i = 0 ; i < imageElements.length; i++) {
//     const imageElement = imageElements[i];
//     imageElement.addEventListener('mouseenter', event => {
//         let mouseExitListener;
//         const mouseEnterTimer = window.setTimeout(function(){
//             const imageHoveredProperties = {
//                 element_class: event.target.className,
//                 element_source: event.target.src,
//                 element_alt: event.target.alt,
//                 element_tag: event.target.tagName.toLowerCase()
//             };
//             rudderstackTrack('Image Hovered', imageHoveredProperties);
//             console.log('Image Hovered', imageHoveredProperties);
//             imageElement.removeEventListener('mouseleave', mouseExitListener)
//         }, 1000);
//         mouseExitListener = imageElement.addEventListener('mouseleave', event => {
//             window.clearTimeout(mouseEnterTimer)
//         })
//     })
// };

// // Image Zoomed
// function trackImageZoom(element) {
//     var zoomedImage = element;
//     const imageZoomedProperties = {
//         element_class: zoomedImage.className,
//         element_source: zoomedImage.src,
//         element_tag: zoomedImage.tagName.toLowerCase()
//     };
//     rudderstackTrack('Image Zoomed', imageZoomedProperties);
//     console.log('Image Zoomed', imageZoomedProperties);
// }
// zoomElements.forEach(element => {
//     element.addEventListener('click', function (event) {
//         trackImageZoom(event.currentTarget)
//     })
// });

// // Tooltip Clicked
// function trackTooltipClick(clickedTooltip) {
//     const tooltipClickProperties = {
//         element_id: clickedTooltip.id,
//         element_class: clickedTooltip.className,
//         element_tag: clickedTooltip.tagName.toLowerCase()
//     };
//     rudderstackTrack('Tooltip Clicked', tooltipClickProperties);
//     console.log('Tooltip Clicked:', clickedTooltip.id, tooltipClickProperties);
// }
// tooltipElements.forEach(element => {
//     element.addEventListener('click', function (event) {
//         trackTooltipClick(event.currentTarget)
//     })
// });

// Insights
window.onload = function(){
    window.setTimeout(function(){
        // Rounds values to nearest hundredth decimal place.
        function round(value, precision) {var multiplier = Math.pow(10, precision || 0);return Math.round(value * multiplier) / multiplier;}
        // Return only distinct values in an array.
        function reachDistinct(values) {var acc = {}; values.forEach(function(value) {acc[value] = 1;}); return Object.keys(acc);}
        // Insights Definitions
        const
            connection = navigator.connection,
            time = performance.getEntriesByType('navigation')[0],
            paint = performance.getEntriesByType('paint'),
            traits = rudderanalytics.getUserTraits(),
            userAnonId = rudderanalytics.getAnonymousId(),
            userName = traits.name,
            userEmail = traits.email,
            userPhone = traits.phone,
            platform = navigator.platform,
            vendor = navigator.vendor,
            memory = navigator.deviceMemory,
            windowWidth = visualViewport.width,
            windowHeight = visualViewport.height,
            connectionType = connection.effectiveType,
            downLink = connection.downlink,
            roundTrip = connection.rtt,
            startTime = time.startTime,
            redirectStart = time.redirectStart,
            redirectEnd = time.redirectEnd,
            fetchStart = time.fetchStart,
            dnsStart = time.domainLookupStart,
            dnsEnd = time.domainLookupEnd,
            connectStart = time.connectStart,
            sslStart = time.secureConnectionStart,
            connectEnd = time.connectEnd,
            requestStart = time.requestStart,
            responseStart = time.responseStart,
            responseEnd = time.responseEnd,
            domInteractive = time.domInteractive,
            domContentStart = time.domContentLoadedEventStart,
            domContentEnd = time.domContentLoadedEventEnd,
            domComplete = time.domComplete,
            loadStart = time.loadEventStart,
            loadEnd = time.loadEventEnd,
            redirect_time = redirectEnd - redirectStart,
            fetch_time = dnsStart - fetchStart,
            dns_time = dnsEnd - dnsStart,
            connect_time = sslStart - connectStart,
            ssl_time = connectEnd - sslStart,
            tcp_time = connectEnd - connectStart,
            request_time = responseStart - requestStart,
            response_time = responseEnd - responseStart,
            processing_time = domComplete - domInteractive,
            domContent_time = domContentEnd - domContentStart,
            load_time = loadEnd - loadStart,
            firstByte = responseStart - startTime,
            firstPaint = paint[0].startTime,
            firstContentfulPaint = paint[1].startTime,
            pageLoad = loadEnd - startTime,
            transferSize = time.transferSize,
            decodedBodySize = time.decodedBodySize;

        const pageInsightsProperties = {
            platform: platform,
            vendor: vendor,
            memory: memory,
            windowWidth: windowWidth,
            windowHeight: windowHeight,
            connectionType: connectionType,
            downLink: downLink,
            roundTrip: roundTrip,
            startTime: startTime,
            redirectStart: redirectStart,
            redirectEnd: redirectEnd,
            fetchStart: fetchStart,
            dnsStart: dnsStart,
            dnsEnd: dnsEnd,
            connectStart: connectStart,
            sslStart: sslStart,
            connectEnd: connectEnd,
            requestStart: requestStart,
            responseStart: responseStart,
            responseEnd: responseEnd,
            domInteractive: domInteractive,
            domContentStart: domContentStart,
            domContentEnd: domContentEnd,
            domComplete: domComplete,
            loadStart: loadStart,
            loadEnd: loadEnd,
            redirect_time: redirect_time,
            fetch_time: fetch_time,
            dns_time: dns_time,
            connect_time: connect_time,
            ssl_time: ssl_time,
            tcp_time: tcp_time,
            request_time: request_time,
            response_time: response_time,
            processing_time: processing_time,
            domContent_time: domContent_time,
            load_time: load_time,
            firstByte: firstByte,
            firstPaint: firstPaint,
            firstContentfulPaint: firstContentfulPaint,
            pageLoad: pageLoad,
            transferSize: transferSize,
            decodedBodySize: decodedBodySize
        };

        console.log('--');
        console.log('%cInsights','font-weight: bold;font-size:1.2em;');
        console.log('--');

        console.log('%cUser','font-weight: bold;font-size:1.1em;');
        console.log('AnonymousId:', userAnonId);
        console.log('--');

        console.log('%cDevice','font-weight: bold;font-size:1.1em;');
        console.log('Platform: ' + platform);
        console.log('Vendor: ' + vendor);
        console.log('Device Memory: ' + memory + 'GB');
        console.log('Window Width: ' + windowWidth + 'px');
        console.log('Window Heigt: ' + windowHeight + 'px');
        console.log('--');

        console.log('%cConnection','font-weight: bold;font-size:1.1em;');
        console.log('Connection Type: ' + connectionType);
        console.log('Connection Speed: ' + downLink + 'MBPS');
        console.log('Round Trip Time: ' + roundTrip + 'ms');
        console.log('--');

        console.log('%cProcessing','font-weight: bold;font-size:1.1em;');
        console.log('Start Time: ' + round(startTime,2) + 'ms');
        console.log('Redirect Start: ' + round(redirectStart,2) + 'ms');
        console.log('Redirect End: ' + round(redirectEnd,2) + 'ms');
        console.log('Fetch Start: ' + round(fetchStart,2) + 'ms');
        console.log('DNS Start: ' + round(dnsStart,2) + 'ms');
        console.log('DNS End: ' + round(dnsEnd,2) + 'ms');
        console.log('Connect Start: ' + round(connectStart,2) + 'ms');
        console.log('SSL Start: ' + round(sslStart,2) + 'ms');
        console.log('Connect End: ' + round(connectEnd,2) + 'ms');
        console.log('Request Start: ' + round(requestStart,2) + 'ms');
        console.log('Response Start: ' + round(responseStart,2) + 'ms');
        console.log('Response End: ' + round(responseEnd,2) + 'ms');
        console.log('DOM Interactive: ' + round(domInteractive,2) + 'ms');
        console.log('DOM Content Start: ' + round(domContentStart,2) + 'ms');
        console.log('DOM Content End: ' + round(domContentEnd,2) + 'ms');
        console.log('DOM Complete: ' + round(domComplete,2) + 'ms');
        console.log('Load Start: ' + round(loadStart,2) + 'ms');
        console.log('Load End: ' + round(loadEnd,2) + 'ms');
        console.log('--');

        console.log('%cPerformance','font-weight: bold;font-size:1.1em;');
        console.log('Redirect Time: ' + round(redirect_time,2) + 'ms');
        console.log('Fetch Time: ' + round(fetch_time,2) + 'ms');
        console.log('DNS Time: ' + round(dns_time,2) + 'ms');
        console.log('Connect Time: ' + round(connect_time,2) + 'ms');
        console.log('SSL Time: ' + round(ssl_time,2) + 'ms');
        console.log('TCP Time: ' + round(tcp_time,2) + 'ms');
        console.log('Request Time: ' + round(request_time,2) + 'ms');
        console.log('Response Time: ' + round(response_time,2) + 'ms');
        console.log('Processing Time: ' + round(processing_time,2) + 'ms');
        console.log('DOM Content Time: ' + round(domContent_time,2) + 'ms');
        console.log('Load Time: ' + round(load_time,2) + 'ms');
        console.log('--');

        console.log('%cKey Metrics','font-weight: bold;font-size:1.1em;');
        console.log('First Byte: ' + round(firstByte/1000,2) + 'sec');
        console.log('First Paint: ' + round(firstPaint/1000,2) + 'sec');
        console.log('First Contentful Paint: ' + round(firstContentfulPaint/1000,2) + 'sec');
        console.log('Page Load: ' + round(pageLoad/1000,2) + 'sec');
        console.log('Transfer Size: ' + round(transferSize/1000,2) + 'kb');
        console.log('Decoded Body Size: ' + round(decodedBodySize/1000,2) + 'kb');
        console.log('--');

        rudderanalytics.track('Page Insights', pageInsightsProperties);
        console.log('Page Insights', pageInsightsProperties);
    });
};
