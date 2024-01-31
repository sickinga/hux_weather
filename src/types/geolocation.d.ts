export interface UseGeolocationOptions
  extends Partial<PositionOptions>,
    ConfigurableNavigator {
  immediate?: boolean
}
/**
 * Reactive Geolocation API.
 *
 * @see https://vueuse.org/useGeolocation
 * @param options
 */
export declare function useGeolocation(options?: UseGeolocationOptions): {
  isSupported: ComputedRef<boolean>
  coords: Ref<GeolocationCoordinates>
  locatedAt: Ref<number | null>
  error: ShallowRef<GeolocationPositionError | null>
  resume: () => void
  pause: () => void
}
export type UseGeolocationReturn = ReturnType<typeof useGeolocation>