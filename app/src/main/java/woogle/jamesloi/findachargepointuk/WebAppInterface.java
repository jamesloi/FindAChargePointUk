package woogle.jamesloi.findachargepointuk;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by James.Loi on 14/06/2016.
 */
public class WebAppInterface {
    Context mContext;

    WebAppInterface(Context c) {
        mContext = c;
    }

    @JavascriptInterface
    public void getLastLocation() {
        if (Location.LastLocation != null) {
            String latitudeText = String.valueOf(Location.LastLocation.getLatitude());
            String longitudeText = String.valueOf(Location.LastLocation.getLongitude());
            MyWebView.AndroidWebView.loadUrl("javascript:getLocation('" + longitudeText + "', '" + latitudeText + "');");
        }
    }

    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

}