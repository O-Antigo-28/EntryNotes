import { MachineName, Note, NOTE_FLAGS, PaymentMethod } from "./Note";
import sqlite3 from "sqlite3"
interface ITableNote {
    id: number,
    value_in_centavos: number,
    authorization: string,
    unique_code: string,
    payment_method: string,
    flag: string,
    sent_on: string,
    machine_name: string,
    ok: number


}
const DB_NAME = "notes.db"
export function createDatabase() {
    const db = new sqlite3.Database(DB_NAME, (err) => {
        if (err) {
            console.log("")
        } else {
            db.close()
            createTableNotes()

        }
    })
}
export function createTableNotes() {
    const db = new sqlite3.Database(DB_NAME, (err) => {
        if (err) {
            console.error(err)
        }
        else {
            db.run(`CREATE TABLE IF NOT EXISTS Note(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                authorization TEXT NOT NULL, 
                value_in_centavos INTEGER NOT NULL, 
                unique_code TEXT UNIQUE NOT NULL,
                payment_method TEXT NOT NULL,
                flag TEXT NOT NULL, 
                sent_on TEXT NOT NULL,
                machine_name TEXT NOT NULL,
                ok BOOLEAN NOT NULL
            )`, () => {
                db.close()
            })
        }
    })

}
function generatePlaceholder(list: string[], placeholder: string) {
    return list.map(() => placeholder).join(",")
}
export function generateUniqueCodeForNote(note: Note): string {
    return note.machineName + "-" + note.authorization + "-" + note.value + "-" + note.date.toLocaleDateString("pt-BR")
}

export async function storageNotes(notes: Note[]) {
    const db = new sqlite3.Database(DB_NAME, (err) => {
        if (err) return console.log(err)
    })
    console.log("tudo bem")
    try {

        await Promise.all(notes.map((note) => {

            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO Note (authorization, value_in_centavos, unique_code, payment_method, flag, sent_on, machine_name, ok) VALUES (?,?,?,?,?,?,?,?)`, [note.authorization ,note.value * 100, generateUniqueCodeForNote(note), note.paymentMethod, note.flag, note.date.toISOString(), note.machineName, 0],
                    (err) => {
                        if (err) {
                            reject(err)
                            return
                        }
                        else {
                            resolve(null)
                        }
                    })

            })

        }))
    } catch (err) {
        console.error("erro?", err)
        throw new Error("Não foi possivel salvar as notas")
    }
    finally {
        db.close()
    }


}
export async function get_unique_code_existing_notes(new_notes: Note[]) {
    const db = new sqlite3.Database(DB_NAME, (err) => {
        if (err) {
            console.error(err)
        }
        const unique_codes = new_notes.map((note) => generateUniqueCodeForNote(note))
        const query = `SELECT unique_code FROM Note WHERE unique_code IN (${generatePlaceholder(unique_codes, "?")})`
        return new Promise((resolve, reject) => {
            db.all(query, unique_codes, (err, rows) => {
                if (err) {

                    console.error(err);
                    reject(err)
                    db.close()
                    return;
                }
                console.log(rows)
                db.close()
                resolve(rows)

            })
        })

    })
}



export async function get_pending_notes(): Promise<Note[]> {

    const db = new sqlite3.Database(DB_NAME)
    try {
        const notes = await new Promise<Note[]>((resolve, reject) => {
            db.all<ITableNote>("SELECT value_in_centavos, unique_code, payment_method, flag, sent_on, machine_name, authorization FROM Note WHERE ok = ?", [0],
                (err, rows) => {
                    if (err) {
    
                        reject(err)
                        return
                    }
                    const notes = rows.map((row) => {
                        const value = row.value_in_centavos / 100
                        const date = new Date(row.sent_on)
                        return new Note(row.authorization, row.machine_name as MachineName, row.payment_method as PaymentMethod, value, date, row.flag as NOTE_FLAGS, false)
                    })
                    resolve(notes)
                })
        })
        return notes
    } catch (e) {

    }
    finally{
        db.close()
    }
}

export async function confirmNotes(notes: Note[]){
    if(notes.length ===0) return;
    const db = new sqlite3.Database(DB_NAME);
    const unique_codes = notes.map((note) => generateUniqueCodeForNote(note))

    const query = `UPDATE Note SET ok = 1 WHERE unique_code IN (${generatePlaceholder(unique_codes, '?')})` 
    try{
        await new Promise((resolve, reject)=> {
            db.run(query, unique_codes, (err) => {
                if(err){
                    reject(err)
                    return
                }

                resolve(null)
            })
        })
    }catch(e){
        console.log("erro")
    }
    finally{
        db.close()
    }
}