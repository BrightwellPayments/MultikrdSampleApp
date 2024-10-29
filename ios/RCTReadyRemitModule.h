//
//  ReadyRemitDelegate.h
//  ReactNativeSampleApp
//
//  Created by Lucas Araujo on 29/10/24.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

//ReadyRemitSDK
#import "ReadyRemitSDK/ReadyRemitSDK.h"

@interface RCTReadyRemitModule : RCTEventEmitter <RCTBridgeModule, ReadyRemitDelegate> {
  void (^_authSuccessCallback)(NSString *token);
  void (^_transferSuccessCallback)(NSString *token);
  void (^_transferFailCallback)(NSString *error, NSString *errorMessage);
}

@end
