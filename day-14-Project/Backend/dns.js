const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

module.exports = dns;
