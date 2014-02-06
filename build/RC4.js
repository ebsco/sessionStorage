/** RC4 Stream Cipher
 *  http://www.wisdom.weizmann.ac.il/~itsik/RC4/rc4.html
 * @build       2009-08-20 23:35:07
 * @author      Andrea Giammarchi
 * @license     Mit Style License
 * @project     http://code.google.com/p/sessionstorage/
 */

/** RC4 Stream Cipher
 *  http://www.wisdom.weizmann.ac.il/~itsik/RC4/rc4.html
 * -----------------------------------------------
 * @description     A quick stream cipher object able to encode
 *                  or decode whatever string using
 *                  a random key from lennght 1 to 256
 *
 * @author          this JavaScript porting by Andrea Giammarchi
 * @license         Mit Style License
 * @blog            http://webreflection.blogspot.com/
 * @version         1.1
 * @compatibility   hopefully every browser
 */
 var RC4 = (function(fromCharCode, random){
    return {

        /** RC4.decode(key:String, data:String):String
         * @description     given a data string encoded with the same key
         *                  generates original data string.
         * @param   String  key precedently used to encode data
         * @param   String  data encoded using same key
         * @return  String  decoded data
         */
        decode:function(key, data){
            return this.encode(key, data);
        },

        /** RC4.encode(key:String, data:String):String
         * @description     encode a data string using provided key
         * @param   String  key to use for this encoding
         * @param   String  data to encode
         * @return  String  encoded data. Will require same key to be decoded
         */
        encode:function(key, data){
            // cannot spot anything redundant that
            // could make this algo faster!!! Good Stuff RC4!
            for(var
                length = key.length, len = data.length,
                decode = [], a = [],
                i = 0, j = 0, k = 0, l = 0, $;
                i < 256; ++i
            )   a[i] = i;
            for(i = 0; i < 256; ++i){
                j = (j + ($ = a[i]) + key.charCodeAt(i % length)) % 256;
                a[i] = a[j];
                a[j] = $;
            };
            for(j = 0; k < len; ++k){
                i = k % 256;
                j = (j + ($ = a[i])) % 256;
                length = a[i] = a[j];
                a[j] = $;
                decode[l++] = fromCharCode(data.charCodeAt(k) ^ a[(length + $) % 256]);
            };
            return decode.join("");
        },

        /** RC4.key(length:Number):String
         * @description     generate a random key with arbitrary length
         * @param   Number  the length of the generated key
         * @return  String  a randomly generated key
         */
        key:function(length){
            for(var i = 0, key = []; i < length; ++i)
                key[i] = fromCharCode(1 + ((random() * 255) << 0));
            return key.join("");
        }
    }
    // I like to freeze stuff in interpretation time
    // it makes things a bit safer when obtrusive libraries
    // are around
})(window.String.fromCharCode, window.Math.random);