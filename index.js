const { version } = "v1.1.0"
const sector = "AeryumaSactuanary-Devoid10";
const oniichan = ["566214348368773121", "765195570347638784", "552487001824296970", "859942243372499005", "741155604747517963", "925278762206105651"]

class ConstellarExtension {
  constructor() {
    this._events = {};
    this.version = "v1.1.0-discord";
    this.shard = null;
    this.ApiObj = undefined;
    this.databaseStart = undefined;
    this.systemStart = undefined;
    this.commands = []
  }
  open(client, tokenApi, mongoLink) {
    try {
      const axios = require("axios");

      if (!client) {
        throw 'Client Tidak Ditemukan'
      } else if (!tokenApi) {
        throw 'Token API Tidak Ditemukan'
      }

      //Config
      try {
        this.shard = client.guilds.cache.map(x => x.shardId)[0];
      } catch (err) {
        console.log(`[ERROR] Setup Gagal : ${err}`)
      }

      //Constellar Obj
      this.ApiObj = null
      this.start = Date.now()
      console.log(`[START] Constellar Extension Aeryuma ${this.version}`)

      //Langsung Gasken :v
      console.log(`
[INFO] Open Constellar 
    ====================================
    Constellar Inugaku (Discord)
    ------------------------------------
    • Node : ${process.version}
    • Constellar : ${this.version}
    • Discord.js : ${require('discord.js').version}
    Dev : Kanaka Nakazawa
    ××××××××××××××××××××××××××××××××××××
    Username : ${client.user.username}
    ID : ${client.user.id}
    Shard : ${this.shard}
    //Shard
    Servers : ${client.guilds.cache.size}
    Members : ${client.users.cache.size}
    Channels : ${client.channels.cache.size}
    ====================================
    ©AeryumaDevelopment`)

      this.systemStart = Date.now();

      /*=================
      Uptime
      ===================*/
      var express = require('express')
      var app = express()
      app.get('/', (req, res) => res.sendStatus(200))
      app.listen(process.env.PORT)
      /*=================
      API Get
      ===================*/
      const passcode = tokenApi
      try {
        axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
          console.log('[INFO] API Connected (JsonObjAPI)...')
          if (x.data === undefined || null) return console.log("[ERROR] Gomenne Oniichan, Ternyata API Menghasilkan undefined / null")
          this.ApiObj = x.data
          client.things = x.data
          client.things.this = x.data.bot.find(x => x.id = client.user.id)
        }).catch(function(error) {
          return console.log(`[ERROR] ApiError (JsonObjAPI) : Gagal Terhubung... Return`)
        })
      } catch (err) {
        console.log(`[ERROR] ApiError (JsonObjAPI) ${err}`)
      }
      (async () => {
        try {
          const promises = await client.shard.broadcastEval(client => [this.shard.ids[0], this.guilds.cache.size, this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)])
          let finale = [];
          promises.forEach((value) => {
            finale.push({
              id: value[0],
              guilds: value[1],
              members: value[2]
            })
          })
          axios.post("https://AeryumaKashigami.nekokawaikanaka.repl.co/api/stats", { id: client.user.id, apiKey: passcode, shard: finale }).then(x => {
            console.log('[INFO] API Connected (PostStatsAPI) .. ')
          }).catch(function(error) {
            return console.log(`[ERROR] ApiError (PostStatsAPI) : Gagal Terhubung... Return`)
          })
        } catch (err) {
          console.log('[ERROR] ApiError (PostStatsAPI) :' + err)
        }
      })

      setInterval(async function() {
        try {
          const promises = await client.shard.broadcastEval(client => [this.shard.ids[0], this.guilds.cache.size, this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)])
          let finale = [];
          promises.forEach((value) => {
            finale.push({
              id: value[0],
              guilds: value[1],
              members: value[2]
            })
          })
          axios.post("https://AeryumaKashigami.nekokawaikanaka.repl.co/api/stats", { id: client.user.id, apiKey: passcode, shard: finale }).then(x => {
            console.log('[INFO] API Send (PostStatsAPI) .. ')
          }).catch(function(error) {
            return console.log(`[ERROR] ApiError (PostStatsAPI) : Gagal Terhubung... Return`)
          })
        } catch (err) {
          console.log('[ERROR] ApiError (PostStatsAPI) :' + err)
        }
      }, 50000)
      setInterval(function() {
        try {
          axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
            console.log('[INFO] API Restarting..')

            if (x.data === undefined || null) return console.log("[ERROR] Gomenne Oniichan, Ternyata API Menghasilkan undefined / null")
            this.ApiObj = x.data
            client.things = x.data
            client.things.this = x.data.bot.find(x => x.id = client.user.id)
          }).catch(function(error) {
            return console.log(`[ERROR] ApiError (JsonObjAPI) : Gagal Terhubung... Return`)
          })
        } catch (err) {
          console.log(`[ERROR] ApiError (JsonObjAPI) : ${err}`)
        }
      }, 30000)

      //Database Dari .env
      const mongoose = require('mongoose')
      if (!mongoLink) {
        console.log('[INFO] Login Tanpa Database')
      } else {
        try {
          this.databaseStart = Date.now()
          mongoose.connect(
            mongoLink, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true }
          );
          mongoose.connection.on('open', () => {
            console.log(`[INFO] Database Connected (Mongoose)`);
          });
          mongoose.connection.on('error', err => {
            console.log("[DATABASE] Error :" + err);
          });
        } catch (err) {
          console.log('[INFO] Database Failed to Connect (Mongoose) :\n\n' + err)
        }

      }

      //Ya Gak Tau Sih...
      const snek = require('node-superfetch');
      client.hastebin = async text => {
        const { body } = await snek
          .post('https://bin-clientdev.glitch.me/documents')
          .send(text);
        return `https://bin-clientdev.glitch.me/${body.key}`;
      };

      setTimeout(async function() {
        try {
          const setslash = { name: 'setslash', description: 'Memasang Slash Command' }
          await this.commands.push(setslash)
          await client.application.commands.set(this.commands, '853233681879793675')
        } catch (err) {
          console.log("[ERROR] Setup Slash Cmd :" + err)
        }
      }.bind(this), 1000)


    } catch (err) {
      console.log(`[ERROR] Eror : ${err}`)
      process.exit()
    }
  }

  addCommand(cmd) {
    if (!typeof cmd === Array) throw 'Harus Array'
    this.commands = cmd
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener);
  }

  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback) => {
      callback(data);
    };

    this._events[name].forEach(fireCallbacks);
  }

  ping() {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }
      var start = Date.now()
      var end = Date.now()
      return (end - start).toString + 'ms'
    } catch (err) {
      `[ERROR] Eror Terdeteksi Kak : ${err}`
    }
  }

  clientStats(client) {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }
      if (!client) throw 'Clientnya Gak Ada :)'
      const promises = [
	client.shard.fetchClientValues('guilds.cache.size'),
	client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
];
      return Promise.all(promises)
        .then(results => {
          const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
          const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
          return { totalGuilds: totalGuilds, totalMembers: totalMembers }
        })
    } catch (err) {
      `[ERROR] Eror Terdeteksi Kak : ${err}`
    }
  }
}

function get(url) {
  var axios = require('axios')
  return axios.get(url).then(x => x.data)
}

//Module Exports
module.exports = {
  Client: ConstellarExtension,
  version: version,
  sector: sector,
  dev: oniichan,
  get: get
}
