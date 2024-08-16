import React from 'react'

export default function Countdown({ countDown }) {
    return (
        <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div class="bg-white rounded-lg p-8 max-w-sm w-full">
                <h2 class="text-2xl font-semibold mb-4">Starting in:</h2>
                <p class="text-4xl font-bold text-center">{countDown}</p>
            </div>
        </div>
    )
}
