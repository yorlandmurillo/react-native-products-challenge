package com.newhpchallenge

import android.content.ContentValues
import android.content.Context
import android.provider.CalendarContract
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CalendarModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "CalendarModule"
    
    @ReactMethod
    fun addEvent(title: String, description: String, startMillis: Double, endMillis: Double, promise: Promise) {
        try {
            val cr = reactApplicationContext.contentResolver
            val values = ContentValues().apply {
                put(CalendarContract.Events.DTSTART, startMillis.toLong())
                put(CalendarContract.Events.DTEND, endMillis.toLong())
                put(CalendarContract.Events.TITLE, title)
                put(CalendarContract.Events.DESCRIPTION, description)
                put(CalendarContract.Events.CALENDAR_ID, 1) // usualmente la primera cuenta
                put(CalendarContract.Events.EVENT_TIMEZONE, "UTC")
            }

            val uri = cr.insert(CalendarContract.Events.CONTENT_URI, values)
            if (uri != null) {
                promise.resolve("Event added successfully!")
            } else {
                promise.reject("ADD_FAILED", "Failed to add event")
            }
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
