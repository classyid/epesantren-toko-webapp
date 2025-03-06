// Constants
const API_KEY = "<apikey>";
const API_BASE_URL = "<link API Epesantren>";

/**
 * Main function that creates the webapp UI
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('ePesantren Toko - Sistem Tabungan Santri')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Get all student data from the ePesantren API
 * @return {Object} Response from the API containing student data
 */
function getAllStudentData() {
  try {
    const response = callApi('get_data', { key: API_KEY });
    
    if (response && response.status === 1) {
      // Process data if needed before sending to client
      // For example, sort by name
      if (response.data && Array.isArray(response.data)) {
        response.data.sort((a, b) => a.nama.localeCompare(b.nama));
      }
      
      return response;
    } else {
      throw new Error(response.message || "API returned an error");
    }
  } catch (error) {
    Logger.log("Error getting student data: " + error.message);
    throw error;
  }
}

/**
 * Get data for a single student by NIS
 * @param {string} nis The student's NIS
 * @return {Object} Student data
 */
function getSingleStudentData(nis) {
  try {
    const response = callApi('get_data_first', { 
      key: API_KEY,
      nis: nis
    });
    
    if (response && response.status === 1) {
      return response.data;
    } else {
      throw new Error(response.message || "API returned an error");
    }
  } catch (error) {
    Logger.log("Error getting single student data: " + error.message);
    throw error;
  }
}

/**
 * Process a transaction for a student
 * @param {Object} transactionData Object containing transaction details
 * @return {Object} Transaction result
 */
function processStudentTransaction(transactionData) {
  try {
    // Extract transaction data
    const { nis, nominal, transactionType } = transactionData;
    
    // Log untuk debugging
    Logger.log("Processing transaction for NIS: " + nis + ", Amount: " + nominal + ", Type: " + transactionType);
    
    // Process based on transaction type
    if (transactionType === "use_saving") {
      try {
        // Call use_saving API
        const response = callApi('use_saving', {
          key: API_KEY,
          nis: nis,
          nominal: nominal
        });
        
        Logger.log("Transaction API response: " + JSON.stringify(response));
        
        if (response && response.status === 1) {
          // Get updated student data after transaction
          try {
            const updatedStudent = getSingleStudentData(nis);
            return {
              status: 1,
              message: "Transaksi berhasil",
              data: updatedStudent
            };
          } catch (getDataError) {
            Logger.log("Error getting updated student data: " + getDataError.message);
            // Jika gagal mendapatkan data terbaru, kembalikan sukses tanpa data
            return {
              status: 1,
              message: "Transaksi berhasil, tetapi gagal memperbarui data santri",
              data: null
            };
          }
        } else {
          throw new Error(response && response.message ? response.message : "API returned an error");
        }
      } catch (apiError) {
        Logger.log("Transaction API error: " + apiError.message);
        
        // Periksa apakah pesan error berisi informasi spesifik
        if (apiError.message.indexOf("NIS Not Found") !== -1) {
          throw new Error("NIS santri tidak ditemukan di database ePesantren");
        } else {
          throw apiError;
        }
      }
    } else {
      throw new Error("Jenis transaksi tidak valid");
    }
  } catch (error) {
    Logger.log("Error processing transaction: " + error.message);
    throw error;
  }
}

/**
 * Helper function to call the ePesantren API
 * @param {string} endpoint API endpoint to call
 * @param {Object} data Data to send with the request
 * @return {Object} API response
 */
function callApi(endpoint, data) {
  const url = API_BASE_URL + endpoint;
  
  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'muteHttpExceptions': true,
    'payload': JSON.stringify(data)
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    // Log respons untuk debugging
    Logger.log("API Response for " + endpoint + ": Code=" + responseCode + ", Text=" + responseText);
    
    // Menerima kode 200 (OK) dan 201 (Created) sebagai respons sukses
    if (responseCode === 200 || responseCode === 201) {
      // Coba parse JSON dengan penanganan error yang lebih baik
      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        Logger.log("Error parsing JSON: " + parseError.message);
        Logger.log("Response text: " + responseText);
        
        // Jika gagal parse, coba bersihkan respons dan parse lagi
        try {
          // Beberapa API mengembalikan karakter non-JSON di awal/akhir respons
          const cleanResponse = responseText.trim().replace(/^\uFEFF/, ''); // Menghapus BOM jika ada
          return JSON.parse(cleanResponse);
        } catch (secondParseError) {
          throw new Error("Invalid JSON response from API: " + secondParseError.message);
        }
      }
    } else {
      // Untuk error kode 400-499, coba parse respons untuk mendapatkan pesan error
      try {
        const errorResponse = JSON.parse(responseText);
        if (errorResponse && errorResponse.message) {
          throw new Error(errorResponse.message);
        }
      } catch (parseError) {
        // Jika parsing gagal, gunakan pesan generik
      }
      
      throw new Error(`API returned status code ${responseCode}`);
    }
  } catch (error) {
    Logger.log("API call error: " + error.message);
    throw error;
  }
}

/**
 * Cache helper functions to improve performance
 */
function getCachedData(key) {
  const cache = CacheService.getScriptCache();
  const data = cache.get(key);
  return data ? JSON.parse(data) : null;
}

function setCachedData(key, data, expirationInSeconds = 600) {
  const cache = CacheService.getScriptCache();
  cache.put(key, JSON.stringify(data), expirationInSeconds);
}

/**
 * Error logging function
 */
function logErrorToServer(errorMessage, location, additionalData) {
  Logger.log("ERROR - " + location + ": " + errorMessage);
  if (additionalData) {
    Logger.log("Data tambahan: " + JSON.stringify(additionalData));
  }
  return true;
}
