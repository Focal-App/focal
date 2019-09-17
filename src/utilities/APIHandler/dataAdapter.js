import { formatDate } from "utilities/date";

const DefaultText = {
    noContent: "-",
}

class DataAdapter {
    static toUserModel = (apiUser) => {
        const { avatar, email, first_name, uuid } = apiUser;
        return {
            avatar,
            email,
            first_name,
            uuid
        }
    }

    static toClientModel = (apiClient) => {
        const { client_first_name, client_last_name, client_email, client_phone_number, private_notes, uuid } = apiClient;
        return {
            client_first_name: client_first_name ? client_first_name : DefaultText.noContent,
            client_last_name: client_last_name ? client_last_name : DefaultText.noContent,
            client_email: client_email ? client_email : DefaultText.noContent,
            client_phone_number: client_phone_number ? client_phone_number : DefaultText.noContent,
            private_notes: private_notes ? private_notes : DefaultText.noContent,
            uuid
        }
}

    static toTaskModel = (apiTask) => {
        const { category, is_completed, step, uuid } = apiTask;
        return {
            category: category ? category : DefaultText.noContent,
            is_completed,
            step: step ? step : DefaultText.noContent,
            uuid
        }
    }

    static toEventModel = (apiEvent) => {
        const { event_name, package_uuid, shoot_date, uuid } = apiEvent;
        return {
            event_name: event_name ? event_name : DefaultText.noContent,
            package_uuid,
            shoot_date: shoot_date ? formatDate(shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toPackageModel = (apiPackage) => {
        if (apiPackage) {
            const { package_events, package_name, uuid } = apiPackage;
            const upcoming_shoot_date = package_events.length > 0 && package_events[0].shoot_date 
                                        ? formatDate(package_events[0].shoot_date) 
                                        : DefaultText.noContent;
            return {
                package_name: package_name ? package_name : DefaultText.noContent,
                uuid,
                upcoming_shoot_date
            }
        }
        
        return {
            package_events: [],
            package_name: DefaultText.noContent,
            upcoming_shoot_date: DefaultText.noContent
        }
    }

    static toAllClientDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) { 
            return [];
        }
        
        return apiUserClients.map(client => {
            const data = {
                client: this.toClientModel(client),
                current_stage: this.toTaskModel(client.current_stage),
                package: this.toPackageModel(client.package),
                events: {}
            }
            if (client.package && client.package.package_events) {
                client.package.package_events.forEach((event) => {
                    data.events[event.event_name] = this.toEventModel(event);
                });
            }
            return data;
        })
    }

    static toAllClientPartialDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) { 
            return [];
        }
        
        return apiUserClients.map(client => {
            const { client_first_name, partner_first_name, package_name, current_stage, upcoming_shoot_date, uuid } = client;
            return {
                partner_first_name: partner_first_name ? partner_first_name : DefaultText.noContent,
                client_first_name: client_first_name ? client_first_name : DefaultText.noContent,
                package_name: package_name ? package_name : DefaultText.noContent,
                current_stage: this.toTaskModel(current_stage),
                upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) : DefaultText.noContent,
                uuid
            }
        });
    }
}

export default DataAdapter;