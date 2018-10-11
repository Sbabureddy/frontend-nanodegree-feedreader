/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        //  expiremented with allFeeds variable and app.js to be an empty array 
        it('is all feeds defined', function() {
            expect(allFeeds).not.toBeUndefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  Writed a test that loops through each feed using for of loop
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has a URL defined',function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeTruthy();
                expect(feed.url.constructor).toBe(String);
            }
        });

        /*  Writed a test that loops through each feed using for of loop
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is not empty', function(){
            for(let feed of allFeeds){
                expect(feed.name).toBeTruthy();
                expect(feed.name.constructor).toBe(String);
            }
        });
    });


    /*  Writed a new test suite named "The menu" */
    describe('The menu', function(){
        /*  Writed a test that ensures the menu element is
         *implement this test using classList.contains class of menu-hidden */
        it('is menu hidden by default', function(){
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBeTruthy();
        });
        //  checked  the menu element has menu.hidden class and togglind on click
         it('menu changes', function(){
            let menuButton = document.querySelector('a.menu-icon-link');
            menuButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBeFalsy();
            menuButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
            menuButton.click();
        });
    });
    /* Writed a new test suite named "Initial Entries" 
     used Jasmine's beforeEach and asynchronous done() function.*/
    describe('Initial Entries', function(){
        beforeEach(function(done){
            loadFeed(1, done)
        });
        it('is loadFeed function is called', function(){
            let initialEntries = document.querySelector('div.feed');
            let ieChildren = initialEntries.querySelectorAll('article.entry')
            expect(ieChildren.length).not.toEqual(0);
        });
    });
    /*  Writed  a new test suite named "New Feed Selection" and 
    * checked loadFeed function works correctly*/
    describe('New Feed Selection', function(){
        let feedOne, feedTwo;
        beforeEach(function(done){
            loadFeed(3, function(){
                feedOne = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function(){
                    feedTwo = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });
        it('is new feed loaded', function(){
            expect(feedOne).not.toBe(feedTwo);
        });
    });
}());
