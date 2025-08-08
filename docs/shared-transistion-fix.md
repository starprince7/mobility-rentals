Root cause is almost certainly that the element with the sharedTransitionTag either doesn’t exist at the exact navigation moment on one side, or there are duplicates. With carousels, this is easy to hit because they mount multiple slides.

Do this minimal verification to isolate it in under 3 minutes:

Temporarily bypass the carousel on both screens
VehicleCard: render a single NiceImage (the first image) with sharedTransitionTag={vehicle-image-${_id}} and remove the carousel from that card.
Details: render a single NiceImage using the same first image and the same tag, no carousel and no loading early-return.
If this animates, the stack/router is fine and the bug is strictly from “multiple instances/indices” inside the carousel.
If step 1 works, reintroduce the carousel carefully
Only the visible slide must have the tag. We already changed this, but some carousels still keep 2-3 items mounted. Temporarily set:
loop={false}
autoPlay={false}
width/height fixed
Confirm that only one NiceImage is mounted with the tag by logging its tag on render on both screens.
Confirm the tag values match exactly at press time
Add logs on press and on details first render:
Card: console.log('CARD TAG', vehicle-image-${String(_id)}-${currentIndex})
Details: console.log('DETAILS TAG', vehicle-image-${String(vehicleId)}-${selectedIndex})
You must see the same full string on both sides before/at the moment navigation occurs.
If it still doesn’t animate after the “single image” test in step 1:

The problem isn’t the carousel; it’s that the destination element isn’t mounted in time or the tag isn’t attached to Animated.Image.
Ensure:
The details screen does not early-return a spinner.
NiceImage uses Animated.Image from react-native-reanimated and receives the sharedTransitionTag prop directly (no wrappers blocking it).
The params include _id and images (or coverImage) so the destination image mounts immediately.
If the single-image test fails too, I can switch to a known-good approach that works reliably with carousels: use react-navigation-shared-element. It requires a small setup change, but it’s battle-tested with list-to-details transitions.