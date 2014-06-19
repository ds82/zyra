# zyra

**This project is in planing stage ./. really early alpha and not usable yet**

Zyra <del>is a</del> will be a lightweight remote system monitor.

The system is developed around the idea of servers and agents. Agents collect data
and send it to one or more servers. The server *processes* the data. This can be as simple
as plotting a graph in an UI or store data in a database.

Zyra servers and clients are build around plugins. Plugins collect data (on agents)
and their counter-part plugins on the server subscribe to these data-packets and analyze
them when they are received.

Each plugin is a separate npm module. This results in a lot of plugins, but offers the
most flexible system. It's possible that a single collector plugin (agent) provides data
for several analyzer plugins (e.g. a live cpu usage plotter and a archiver plugin that stores
average cpu usage in a databse or something).

This results in small, easy to write and mantain plugins.