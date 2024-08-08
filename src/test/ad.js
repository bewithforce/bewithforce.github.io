window.googletag = window.googletag || {cmd: []};
googletag.cmd.push(function() {
    googletag.defineSlot('/21857590943,22657440065/tgads_test/300x250', [[300, 300], [300, 250]], 'banner').addService(googletag.pubads());
    googletag.pubads().set("page_url", "taraftar.tv");
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
});

googletag.cmd.push(function() { googletag.display('banner'); });