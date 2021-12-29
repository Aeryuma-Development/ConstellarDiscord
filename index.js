class ConstellarExtension {
  constructor() {
    this._events = {};
    this.version = "v1.0.00000-discord";
    this.mode = undefined;
    this.sector = undefined;
    this.protocol = undefined;
    this.shard = null;
    this.status = undefined;
    this.ApiObj = undefined;
    this.activity = "Error"
  }
  open(client, tokenApi, mongoLink, status) {
    try {
      var axios = require("axios");
      if (!process.version === 'v17.3.0') {
        throw 'Node.js Kamu Tidak Kompatibel Dengan Constellar'
      }
      if (!client) {
        throw 'Client Tidak Ditemukan'
      } else if (!tokenApi) {
        throw 'Token API Tidak Ditemukan'
      }

      var ids = ["796241404603006976", "669431758328037386", "739452602948780102", "700631372670173245", "748711431272136734", "764378706806308865"] //Permission Custom ID
      var oniichan = ["566214348368773121", "765195570347638784", "552487001824296970", "859942243372499005", "741155604747517963", "925278762206105651"]
      //Periksa Izin (Kalau Gak Bisa Ya Kepental 😌)
      if (!ids.includes(client.user.id)) {
        throw 'Kamu Tidak Memiliki Akses'
      }


      //Config
      try {
        this.protocol = "AeryumaSactuanary-Devoid10";
        this.sector = "DiscordSectorProtocol";
        this.mode = 'Normal';
        this.shard = client.guilds.cache.map(x => x.shardId)[0];
      } catch (err) {
        console.log(`[ERROR] Setup Gagal : ${err}`)
      }

      if (status === undefined || null) {
        console.log('[INFO] Status Tidak Di Setup, Secara Otomatis Akan Diganti Menjadi Bawaan Constellar')
        console.log('[INFO] Status Diperbarui Menjadi Default')
        this.activity = `Constellar Bot | Shard ${this.shard}`
      } else {
        console.log('[INFO] Status Diperbarui Menjadi Custom')
        this.activity = status + ` | Shard ${this.shard}`
      }

      //Constellar Obj
      this.ApiObj = null
      this.start = Date.now()
      console.log(`[START] Constellar Extension Aeryuma ${this.version}`)
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
    `)
      console.log('[SETUP] Constellar Disetel Dalam Mode "Normal"')
      console.log('[SETUP] Bahasa Menggunakan Bahasa Indonesia (Kecuali Eror Menggunakan Bahasa Inggris)')

      //Pengecekan Tahap 1
      if (this.status === null || undefined) {
        console.log('(System) Status Tidak Terdaftar')
        return process.exit()
      }


      /*=================
      Bot Status
      ===================*/
      console.log(`[INFO] Aktifitas Bot Saat Ini Adalah\n\n ${this.activity}`)
      client.user.setPresence({ status: 'idle', activities: [{ name: this.activity }] })
      setInterval(function() {
        if (typeof this.activity === "string") {
          client.user.setPresence({ status: 'idle', activities: [{ name: this.activity }] })
        }
      }, 120000)
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
      try {
        axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
          console.log('[INFO] API Connected')
          return this.ApiObj = x.data
        })
      } catch (err) {
        console.log(`[ERROR] API Eror : ${err}`)
      }

      setInterval(function() {
        try {
          axios.get('http://AeryumaNoriyomi.nekokawaikanaka.repl.co').then(x => {
            console.log('[INFO] API Connected')
            return this.ApiObj = x.data
          })
        } catch (err) {
          console.log(`[ERROR] API Eror : ${err}`)
        }
      }, 30000)

      //Database Dari .env
      const mongoose = require('mongoose')
      if (!mongoLink) {
        throw 'Isi Dulu mongoLinknya Kakak 😌'
      } else {
        try {
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

      client.on('ready', () => {
        try {
          const commands = [{ name: 'setslash', description: 'Memasang Slash Command' }, { name: 'eval', description: 'Memasang Slash Command' }, {
              name: 'eval',
              description: 'This Command Is Executed Only By My Owner',
              options: [{ name: 'action', description: 'Enter Code', type: 'STRING', required: true }]
            }, {
              name: 'execute',
              description: 'This Command Is Executed Only By My Owner',
              options: [{ name: 'action', description: 'Enter Code', type: 'STRING', required: true }]
            },
                ]
          client.guilds.cache.get('853233681879793675')
        } catch (err) {
          console.log("[ERROR] Setup Slash Cmd :" + err)
        }
      })
      // Hmmm.....
      client.on('interactionCreate', async (interaction) => {
        if (interaction.isCommand()) {
          if (interaction.commandName === "eval") {
            if (!oniichan.includes(interaction.user.id)) return interaction.reply('Baka!!, Only My Oniichan Can Use This Command -_')
            const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')

            const process = require('child_process')

            /* eslint-disable no-eval, no-unused-vars */

            const Constellar = this
            const some = interaction.options.getString('action')

            const cdb = '```'
            const row = new MessageActionRow()
              .addComponents(new MessageButton()
                .setLabel('Tutup')
                .setCustomId(`deleteeval`)
                .setStyle('DANGER'));

            const bot = client; //hastebin
            const msg = interaction;
            const { args, flags } = parseQuery(some);
            try {

              let code = some;
              let depth = 0;
              if (flags.includes("async")) {
                code = `(async() => { ${code} })()`;
              }

              if (flags.some(x => x.includes("depth"))) {
                depth = flags.find(x => x.includes("depth")).split("=")[1];

                depth = parseInt(depth, 10);
              }

              let { evaled, type } = await parseEval(
                eval(code)
              ); /* eslint-disable-line */

              if (flags.includes("silent")) return;

              if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { depth });

              evaled = evaled

                .replace(/`/g, `\`${String.fromCharCode(8203)}`)

                .replace(/@/g, `@${String.fromCharCode(8203)}`);

              if (evaled.length > 2000) evaled = await client.hastebin(evaled);
              else evaled = `${evaled}`;

              const embed = new MessageEmbed()

                .setAuthor("Eval Berhasil")

                .setColor("GREEN")
                .setDescription(`**Input**\n${cdb}js\n${code}${cdb}\n**Output**\n${cdb}js\n${evaled}${cdb}\n**Type**\n${cdb}js\n${type}${cdb}\n\nKlik Tombol Di Bawah Untuk Menghapus`)

                .setFooter(`Aeryuma Development | Shard ${interaction.guild.shardId}`, this.ApiObj.dev.icon)
                .setTimestamp()

              interaction.reply({
                components: [row],
                content: 'Halo Kak, Ini Hasil Evalnya',
                embeds: [embed]
              })

            } catch (e) {
              const embed = new MessageEmbed()

                .setColor("RED")

                .setAuthor("Eval Eror Kak :(")

                .setDescription(`${cdb}js\n${e}${cdb}\n\nKlik Tombol Di Bawah Untuk Menghapus`)
                .setFooter(`Aeryuma Development | Shard ${interaction.guild.shardId}`, this.ApiObj.dev.icon)
                .setTimestamp()

              interaction.reply({
                components: [row],
                content: 'Halo Kak, Ini Hasil Evalnya',
                embeds: [embed]
              })

            }


            async function parseEval(input) {
              const isPromise =
                input instanceof Promise &&
                typeof input.then === "function" &&
                typeof input.catch === "function";

              if (isPromise) {
                input = await input;

                return {
                  evaled: input,

                  type: `Promise<${parseType(input)}>`
                };
              }

              return {
                evaled: input,

                type: parseType(input)
              };
            }

            function parseType(input) {
              if (input instanceof Buffer) {
                let length = Math.round(input.length / 1024 / 1024);

                let ic = "MB";

                if (!length) {
                  length = Math.round(input.length / 1024);

                  ic = "KB";
                }

                if (!length) {
                  length = Math.round(input.length);

                  ic = "Bytes";
                }

                return `Buffer (${length} ${ic})`;
              }

              return input === null || input === undefined ?
                "Void" :
                input.constructor.name;
            }

            function parseQuery(queries) {
              const args = [];

              const flags = [];

              for (const query of queries) {
                if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
                else args.push(query);
              }

              return { args, flags };
            }

          }
          if (interaction.commandName === "execute") {
            if (!oniichan.includes(interaction.user.id)) return interaction.reply('Baka!!, Only My Oniichan Can Use This Command -_')
            const process = require('child_process')
            interaction.reply(`Tunggu Sebentar Onichan..`)

            process.exec(some, (error, stdout) => {
              let response = error || stdout;

              interaction.followUp(response, { code: "asciidoc", split: "\n" })
                .catch(err => interaction.followUp(err));
            });

            return;
          }

        }

        if (interaction.isButton()) {
          if (interaction.customId === "deleteeval") return interaction.deleteReply()
        }

      })


    } catch (err) {
      console.log(`[ERROR] Eror : ${err}`)
      process.exit()
    }
  }
  setMode(mode) {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }

      if (mode === 1 || "Slyph") {
        `[SETUP] Constellar Disetel Dalam Mode Slyph`
        this.mode = "Slyph"
      }
    } catch (err) {
      console.log(`[ERROR] Eror Terdeteksi Kak : ${err}`)
    }
  }

  exit() {
    try {
      if (!this.mode) throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      "[INFO] Mematikan Host / IDE Beserta Constellar"
      client.destroy()
      process.exit()
    } catch (err) {
      `[ERROR] Constellar Gagal Dimatikan, Saranku Matikan Secara Paksa Kak\n\n ${err}`
    }
  }

  status() {
    try {
      if (!this.mode) {
        throw 'Kakak, Kamu Belum Menyalakan Constellar Sama Sekali'
      }
      return this.status.map(x => x)
    } catch {
      `[ERROR] Eror Terdeteksi Kak : ${err}`
    }
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

  parseDuration(time, lang) {
    //============ •••• ==========
    //Maksimal Tiap Waktu

    var rawms = 1000 //ms
    var rawdetik = 60 //detik
    var rawmenit = 60 //menit
    var rawjam = 24 //jam

    //============ •••• ==========
    //Perhitungan

    var detik = Math.floor(time / rawms);
    if (detik > rawdetik) detik = Math.floor(detik % rawdetik)

    var menit = Math.floor(time / (rawms * rawdetik));
    if (menit > rawmenit) menit = Math.floor(menit % rawmenit)

    var jam = Math.floor(time / (rawms * rawdetik * rawmenit));
    if (jam > rawjam) jam = Math.floor(jam % rawjam)

    var hari = Math.floor(time / (rawms * rawdetik * rawmenit * rawjam))
    //============ •••• ==========
    //Pengkondisian

    var data = `${hari} Days ${jam} Hours ${menit} Minutes ${detik} Seconds`
    if (lang === "en" || undefined || null || "english") {
      return data
    } else if (lang === "id" || "indonesia") {
      data = `${hari} Hari ${jam} Jam ${menit} Menit ${detik} Detik`
      return data
    }
  }

  get(url) {
    var axios = require('axios')
    return axios.get(url).then(x => x.data)
  }
}

module.exports = ConstellarExtension
