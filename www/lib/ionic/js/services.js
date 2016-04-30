angular.module('starter.services', ['ngResource'])

.factory('Auction', function ($resource) {
    return $resource('http://localhost/auctions/:auctionId');
});