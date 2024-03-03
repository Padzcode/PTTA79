const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//fungsi random untuk unique code
function rand(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}

//Membuat dan memasukkan data ke dalam database
const createData = async (nama, email) => {
    //deklarasi db
    const response = await prisma.kakel.create({
        data: {
            name: nama,
            email: email,
            //mengisi code dengan angka random
            code: rand(0,9999).toString()
        }
    })
    return response
}

// Cari item berdasarkan kode tertentu
async function checkItem(code) {
    const item = await prisma.kakel.findUnique({
        where: {
            code: code,
        },
    });

    // Jika item ditemukan dan isExp masih false, lakukan hal ini
    if (item) {
        if (item.isExp === false) {
            return {
                message: 'Msih Bisa Dipake',
                data: item
            }
        } else {
            return {
                    message: 'Ga Bisa Dipake',
                    data: item
            }
        }
    } else {
        return {
            message: "Data Tidak Ditemukan"
        }
    }
}

//Update database dengan memasukkan unique code lalu mengubah value dari isExp menjadi true atau false
const updateData = async (code, trufal=true) => {
    await prisma.kakel.update({
        where: {
            code: code
        },
        data: {
            isExp: trufal,
        }
    })
    return {
        message: "Successfully updated",
        data: await checkItem(code)
    }
}

const deleteItem = async (code) => {
    if (!code) return {message: "Isi dulu"}
    await prisma.kakel.delete({
        where: {
            code: code,
        }
    })
    return {message: "Succesfully deleted"}
}

const getAllItems = async () => {
    return await prisma.kakel.findMany()
}


module.exports = {
    createData,
    checkItem,
    updateData,
    deleteItem,
    rand,
    getAllItems
}