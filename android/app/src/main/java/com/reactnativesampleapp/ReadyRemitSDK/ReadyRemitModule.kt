package com.reactnativesampleapp.ReadyRemitSDK

import com.brightwell.readyremit.sdk.*
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.brightwell.readyremit.sdk.environment.Environment
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.Gson

class ReadyRemitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val REQUEST_CODE = 99
    private val READYREMIT_AUTH_TOKEN_REQUESTED = "READYREMIT_AUTH_TOKEN_REQUESTED"
    private val READYREMIT_TRANSFER_SUBMITTED = "READYREMIT_TRANSFER_SUBMITTED"
    private lateinit var _onAuthCallback: ReadyRemitAuthCallback
    private lateinit var _onTransferCallback: ReadyRemitTransferCallback

    override fun getName(): String {
        return "ReadyRemitModule"
    }

    @ReactMethod
    fun launch(environment: String, language: String = "en", style: ReadableMap? = null) {

        ReadyRemit.initialize(
            ReadyRemit.Config.Builder(currentActivity!!.application)
                .useEnvironment(if(environment == "PRODUCTION") Environment.PRODUCTION else Environment.SANDBOX)
                .useAuthProvider { callback -> requestReadyRemitAccessToken(callback) }
                .useTransferSubmitProvider  { request, callback -> submitReadyRemitTransfer(request, callback) }
                .useLanguage(language)
                .build()
        )

        /**
         * Initiates the remittance process using ReadyRemit.
         *
         * @param1 activity -  The current activity of the application.
         * @param2 requestCode - The request code that will be returned in the `onActivityResult` function this can be a int.
         * @param3 theme - The theme to be applied when initiating the SDK, this should be a id (i.e. R.styles.ReadyRemit) or null to use the SDK default one.
         * @param4 languageCode -  The language code to be used on SDK, in locale format (e.g., "en_US", "es_MX").
         */
        ReadyRemit.remitFrom(currentActivity!!, REQUEST_CODE, null, language)
    }

    @ReactMethod
    fun setAuthToken(token: String, errorAuthCode: String?) {
        if (token != "") {
            _onAuthCallback.onAuthSucceeded(ReadyRemitAuth(token, ""))
        } else {
            _onAuthCallback.onAuthFailed()
        }
    }

    private fun requestReadyRemitAccessToken(callback: ReadyRemitAuthCallback) {
        _onAuthCallback = callback
        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(READYREMIT_AUTH_TOKEN_REQUESTED, null)
    }

    @ReactMethod
    fun setTransferId(transferId: String? = "", errorCode: String? = "", errorMessage: String? = "") {
        if (transferId != "" && transferId != null) {
            _onTransferCallback.onTransferSucceeded(transferId)
        } else if (errorCode != null) {
            val error = ReadyRemitError(errorCode, errorMessage ?: "", errorMessage ?: "")
            _onTransferCallback.onTransferFailed(error)
        }
    }

    private fun submitReadyRemitTransfer(
        request: ReadyRemitTransferRequest,
        callback: ReadyRemitTransferCallback
    ) {
        _onTransferCallback = callback

        var jsonRequest = Gson().toJson(request)

        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(READYREMIT_TRANSFER_SUBMITTED, jsonRequest)
    }
}